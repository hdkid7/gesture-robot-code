from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import asyncio
from bleak import BleakClient

app = Flask(__name__)
CORS(app, support_credentials=True)

bluetooth_mac_address = "3C:A3:08:94:9A:9B"
bluetooth_uuid = "0000ffe1-0000-1000-8000-00805f9b34fb"


def callback(sender, data):
    print(f"{sender}: {data}")


@app.route('/sendpose', methods=['POST'])
@cross_origin(supports_credentials=True)
def send_pose():
    if request.method == 'POST':
        letter = request.data.decode("utf-8")

        asyncio.set_event_loop(asyncio.new_event_loop())

        loop = asyncio.get_event_loop()

        loop.run_until_complete(connect_to_ble(bluetooth_mac_address, letter.replace('"', ''), loop))

        return jsonify({'200': "request has been sent to bluetooth"})


async def connect_to_ble(address, letter, loop):
    async with BleakClient(address) as client:
        await client.start_notify(bluetooth_uuid, callback)  # connects to bluetooth using uuid

        bytes_to_send = bytearray(map(ord, letter))

        send_data_to_ble(bytes_to_send, client, loop)


def send_data_to_ble(bytes_to_send, client, loop):
    await client.write_gatt_char(bluetooth_uuid, bytes_to_send, response=True)  # writes bytes to bluetooth

    await asyncio.sleep(4, loop=loop)  #

    await client.stop_notify(bluetooth_uuid)


if __name__ == '__main__':
    app.run()
