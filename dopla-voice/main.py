import io
from flask import Flask, request, Response, send_file
from flask_cors import CORS
from elevenlabs import generate, stream, set_api_key
import key
from tts import synthesizer
app = Flask(__name__)

CORS(app)

set_api_key(key.ELEVENLABS_API_KEY)

@app.route("/voice/elevenlabs", methods=["POST"])
def speak():
    text = request.args.get("text")
    audio = generate(
        text=text,
        voice="Domi",
        model="eleven_multilingual_v2",
        stream=True
    )
    stream(audio)

    return Response(audio, mimetype="audio/wav")


@app.route("/voice/coqui", methods = ["GET"])
def call_martha():
    text = request.args.get("text")
    if(text):
        text = text
        outputs = synthesizer.tts(text)
        out = io.BytesIO()
        synthesizer.save_wav(outputs, out)
        return send_file(out, mimetype="audio/wav")
    else:
        return {"error": "Please provide the text"}, 400 
if __name__ == "__main__":
    app.run(debug=True, port=5001)