import cv2
from ultralytics import YOLO
import requests
import time 

# Load the YOLOv8 model
model = YOLO('yolov8n.pt')

# Open the video file
cap = cv2.VideoCapture(1)

post_delay = 5
prev_post = 0 
num_persons = 0 

# Loop through the video frames
while cap.isOpened():
    # Read a frame from the videoa
    success, frame = cap.read()

    # Run YOLOv8 inference on the frame
    results = model.predict(source=frame,classes=[0,1], conf=0.2)
    names = model.names
    person_id = list(names)[list(names.values()).index('person')]
    num_persons = results[0].boxes.cls.tolist().count(person_id)
    
    # Visualize the results on the frame
    annotated_frame = results[0].plot()

    # Display the annotated frame
    cv2.imshow("YOLOv8 Inference", annotated_frame)

    time_elapsed = time.time() - prev_post
    if time.time() - prev_post > post_delay:
        prev_post = time.time()
        requests.post('https://keyvalue.immanuel.co/api/KeyVal/UpdateValue/5o3pneid/line1/'+str(num_persons))

        x = requests.get('https://keyvalue.immanuel.co/api/KeyVal/GetValue/5o3pneid/line1').text
        x= x[1:len(x)-1]
        b = requests.get('https://keyvalue.immanuel.co/api/KeyVal/GetValue/5o3pneid/line2').text
        b= b[1:len(b)-1]

        print(f"The numbers found in the database are: {x,b}")

    # Break the loop if 'q' is pressed
    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

# Release the video capture object and close the display window
cap.release()
cv2.destroyAllWindows()