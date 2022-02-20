# inter-iit-task-server

**Setup**

```bash
# Install dependencies 
npm install

# Running the application
npm start
```

## Api Endpoints 

1. ```bash /links ``` - Manually trigger the endpoint for getting links for Youtube Search API and Storing in MongoDB Atlas.
2. ```bash /count ``` - Gives no. of links in the db
3. ```bash /youtubelinks/:page ``` - Gives no. of links to be present in the page.

**More on the task**
* For periodically getting the links I could have used node-cron or using messaging queues.
* For chronologically rendering, I could have sorted in the MongoDB querying.
