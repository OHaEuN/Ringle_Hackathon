import json
import requests
import numpy as np

text = ["I'm feeling very nervous about an upcoming job interview I have.", "I'm feeling very anxious about an upcoming job interview I have."]

headers = {'Content-Type':'application/json'}
address = "http://127.0.0.1:2431/inference"
data = {'text':text}

result = requests.post(address, data=json.dumps(data), headers=headers)
result = str(result.content, encoding='utf-8')
print(json.dumps(result))