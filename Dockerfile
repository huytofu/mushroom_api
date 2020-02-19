
# Use an official Node runtime as a parent image
FROM node:8.16.0

# Set the working directory to /app
WORKDIR '/app'

# Copy all to the working directory
COPY . /app

# Install any needed packages specified in package.json
RUN apt-get update
RUN apt-get install python3-pip -y
RUN mkdir python-packages
RUN export PYTHONPATH=$PWD/python-packages
RUN pip3 install numpy --target=python-packages
RUN npm install -g nodemon
RUN npm install

# Make port 4000 available to the world outside this container
EXPOSE 4000

# Run index.js when the container launches
RUN npm run test
CMD ["nodemon", "./bin/www.js"]
