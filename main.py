from flask import Flask
from flask_restful import Api, Resource, reqparse
from twilio.rest import Client
from bs4 import BeautifulSoup
import re
from flask_cors import CORS

app = Flask(__name__)
api = Api(app)
CORS(app)


client = Client(account_sid, auth_token)

def parse_html_to_plain_text(html_content):
    soup = BeautifulSoup(html_content, "html.parser")
    plain_text = soup.get_text(separator="\n").strip()
    plain_text = re.sub(r'\n\s*\n', '\n\n', plain_text)
    return plain_text

class Notification(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("mobile_number", type=str, required=True, help="Mobile number is required")
        parser.add_argument("body", type=str, required=True, help="body is required")
        args = parser.parse_args()

        try:
            client.messages.create(
                from_='whatsapp:+14155238886',
                body=parse_html_to_plain_text(args["body"]),
                to=f'whatsapp:{"91"+args["mobile_number"]}'
            )
            return {"error": False, "message": "Notification sent successfully"}, 200

        except Exception as e:
            return {"error": True, "message": str(e)}, 500

api.add_resource(Notification, '/send_notification')

if __name__ == "__main__":
    app.run(debug=True, port=5000)