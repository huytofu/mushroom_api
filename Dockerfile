
# Use an official Node runtime as a parent image
FROM node:8.16.0

# Set the working directory to /app
WORKDIR '/app'

# Copy all to the working directory
COPY . /app

# Install any needed packages specified in package.json
RUN apt-get update || : && apt-get install python -y
RUN apt install python3-pip -y
RUN pip install numpy
RUN pip install pandas
RUN pip install pickle
RUN npm install

# Make port 4000 available to the world outside this container
EXPOSE 4000

# Run index.js when the container launches
CMD ["npm run nodemon"]
