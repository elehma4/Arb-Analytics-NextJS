# sequelize model:generate --name users --attributes email:string,password:string

# sequelize model:generate --name protocols --attributes name:string,llamaID:integer,description:string,symbol:string,url:string,logo:string

# sequelize model:generate --name favorites --attributes userID:integer,protocolID:integer

sequelize model:generate --name performance_logs --attributes event_category:string,event_type:string,event_value:text,page_url:text

# event_category: This field can be used to group similar types of events. For example, page interactions could be a category with event types like 'page_load', 'button_click', etc.

# event_type: This field specifies the type of event that occurred, such as 'page_load', 'button_click', or 'API_call'.

# event_value: This field is used to store additional details about the event. For example, if the event is a page load, the event_value could be the duration of the load. Since this field is of text type, it can store a larger amount of data compared to string.

# page_url: For events related to page loads or interactions, this field could be used to store the URL of the page where the event occurred. This will help you understand which pages in your application are most used or have performance issues.
