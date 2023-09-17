from flask import Flask, render_template, url_for, request, redirect
import PureCloudPlatformClientV2
from PureCloudPlatformClientV2.rest import ApiException
from pprint import pprint
import json
import requests
from flask_cors import CORS, cross_origin


# Set region to Canada central
region = PureCloudPlatformClientV2.PureCloudRegionHosts.ca_central_1
PureCloudPlatformClientV2.configuration.host = region.get_api_host()


# Configure OAuth2 access token for authorization: PureCloud OAuth
PureCloudPlatformClientV2.configuration.access_token = '8G-s8tQ6kN4NJ2rnvntVy9vj7visETSQtUNYZAQOOf546ZE4liQgODZlofkek9RaLNAewjshgPXIcIaCq9Em0A'

# create an instance of the API class
api_instance = PureCloudPlatformClientV2.RoutingApi();

# Obtained using OAuth
queue_id = 'fde58531-8324-4957-975f-f7aad782f905' # str | queueId

app = Flask(
  __name__,
  template_folder='templates',
  static_folder='static'
)

CORS(app)

# Gets all the people in line as a dictionary: [{'type': 'genesys' or 'in person', 'wait_time': wait_time_seconds, 'people': people}, ...]
@app.route('/api/all-lines')
def all_lines():

    try:
    # Get Estimated Wait Time
        api_response = api_instance.get_routing_queue_estimatedwaittime(queue_id)
    except ApiException as e:
        print("Exception when calling RoutingApi->get_routing_queue_estimatedwaittime: %s\n" % e)
        return
        
    # All times in seconds
    genesys_time = api_response.results[0].estimated_wait_time_seconds
    # Fake time; get from the CV project
    cam1_people = int(requests.get('https://keyvalue.immanuel.co/api/KeyVal/GetValue/5o3pneid/line1').text[1:-1])
    cam2_people = int(requests.get('https://keyvalue.immanuel.co/api/KeyVal/GetValue/5o3pneid/line2').text[1:-1])

    cam1_time = cam1_people * 6.3 * 60
    cam2_time = cam2_people * 6.3 * 60

    api_val = [
        {
            'id': '1',
            'type': 'genesys',
            'wait_time': genesys_time
        },
        {
            'id': '2',
            'type': 'in_person',
            'wait_time': cam1_time,
            'people': cam1_people
        },
        {
            'id': '3',
            'type': 'in_person',
            'wait_time': cam2_time,
            'people': cam2_people
        }
    ]
    return json.dumps(api_val, indent=4)


@app.route('/api/refined-lines')
def refined_lines():
    data = json.loads(all_lines())
    wt = [int(data[0]['wait_time'] / 60), int(data[1]['wait_time'] / 60), int(data[2]['wait_time'] / 60)]
    p = [int(wt[0] / 30) + 1, data[1]['people'], data[2]['people']]

    colours = []
    for e in wt:
        if e <= 5:
            colours.append(('rgb(216, 250, 216)', 'is-success'))
        elif e >= 30:
            colours.append(('rgb(251, 228, 232)', 'is-danger'))
        else:
            colours.append(('rgb(251, 251, 207)', 'is-warning'))

    print(wt, p, colours)

    return json.dumps([wt, p, colours])

@app.route('/')
def home():
    data = json.loads(refined_lines())
    wt = data[0]
    p = data[1]
    colours = data[2]

    print(wt, p, colours)

    return render_template('index.html', p=p, wt=wt, colours=colours)
    

app.run(debug=True, host='0.0.0.0')
