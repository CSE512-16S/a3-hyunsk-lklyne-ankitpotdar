# a3-hyunsk-lklyne-ankitpotdar

# Assignment 3

### Team Members

Hyun Kim hyunskim@uw  
Lyle Klyne lylek@uw  
Ankit Potdar ankitpotdar@uw  

![summary](https://github.com/CSE512-16S/a3-hyunsk-lklyne-ankitpotdar/blob/dev/readme_assets/final%20visualization.png)

### 2016 Earthquake Explorer

We spent a substantial amount of time tracking down a clean dataset that would afford interesting interactions. Among these, we explored data from New York’s stop and frisk policy, various data sets from NASA, as well as state information about building codes and safety. We ultimately settled on a dataset from USGS that included a complete list of earthquakes, including their magnitude and location. We felt this dataset lent itself particularly well to interaction because there are multiple parts of its story. One of these is a broad overview that depicts general trends. In viewing all recent earthquakes, the viewer can discern the location of tectonic plates, as well as areas that are particularly prone to seismic events. As this view is conveying a lot of information at once, the second part of the story relates to specific magnitudes and date ranges. By allowing the viewer to focus in on certain date ranges or magnitudes, the data can be filtered to a point where earthquakes are individually visible and explorable. Without an interaction model, depicting both specific earthquakes and general trends would have been difficult. 


### Instructions to run Earthquake Explorer
The assets for the most part are all within our github project. Some javascript libraries are linked out to external websites. The only setup necessary for the project to run is to establish a simple http server. We used the npm package http-server to resolve cross domain access issues. 

##### Install npm http-server package
> Install Node.js and NPM   
> In terminal run: “npm install -g http-server”  
> Navigate to project root folder in terminal  
> In terminal run: “http-server”  

### Features
World Map
The map shows the filtered results of earthquake events represented as circles. On mouse hover the circles display a tooltip with the magnitude, location, and date of the event. We thought about different encodings on the circle marks for earthquakes events. One issue with using circles is that they may unintentionally encode the areas being influenced. The dataset from USGS uses the approximate longitude and latitude of the epicenter but not the geographic range. We also considered encoding magnitude with color, but decided against it since it require binning to transform magnitude to a nominal encoding. The final representation includes the additional consideration of seismic event count by adding transparency to each mark. Overlapping marks increase the saturation of color to visually indicate the number of events in an area.  
The map marks transform the magnitude into a radius. Care was taken to give visual distinction to the radius of the marks without changing the representation of the data. An additional reach goal was to add panning and zooming functionality. 

###Histogram of Event Counts by Day
The histogram was developed with the intention of filtering to unveil patterns. The entire span of earthquake dataset is represented in counts by day. By clicking and dragging on the histogram a visitor can create a brush to filter events to a selected time frame. The counts are also updated when the magnitude filter is activated. During our design process we discussed adding multiple brushes to compare time ranges, or adding key commands to progress the selected range discretely. We knew this was a reach goal, but discussing it allowed for a better set of assumptions for potential development. We also discussed updating the y-axis scale increase the legibility of the counts, however were not able to do so due to time constraints. 

###Magnitude Filter 
The magnitude filter is a simple approach to focus on certain cull down the number of earthquakes and focus on specific subsets. It was built using a default slider and simple labeling. The tooltips were added for additional clarity, but due to styling constraints one appears below the slider and another above. This prevents the tooltips from overlapping and obscuring each other when a tight magnitude range is set, yet is not ideal from an aesthetic perspective. This part of the design could have been improved by styling the tooltips so that they sat on the outside edges of the handle, or by including the magnitude number on the handle itself. 



### Changes between the Storyboard and Final Implementation
Aside from some pruning, our final application is largely similar to our initial storyboard. The starting concept was to encode information about earthquake magnitude and location on a map, and provide filters to allow the user to isolate certain earthquakes and focus on certain areas. We had certain reach efforts in mind as well, including adding zooming and panning controls to the map, as well as tiling the map across the screen to enable to user to see larger patterns in the data. (As it stands the ring of fire is cut in half.) Although these reach goals guided the development process, we were ultimately unable to implement them due to time constraints. If we were to continue with this project, adding more interaction and clarity to the map would be a feasible and logical next step.  


### Development Process
Development of the application took about 40 man-hours, evenly split between team members. Exploration and discussion of datasets took much longer than expected and included several meetings. Each team member independently found datasets and presented their strengths in quality and in potential for visualization interactions. Once we agreed upon the dataset, the design and development process went quickly.


> Map Ideation
![summary](https://github.com/CSE512-16S/a3-hyunsk-lklyne-ankitpotdar/blob/dev/readme_assets/map%20markerboard.jpg)
  
> Magnitude Slider Ideation  
![summary](https://github.com/CSE512-16S/a3-hyunsk-lklyne-ankitpotdar/blob/dev/readme_assets/magnitude%20slider%20markerboard.jpg)
  
> Tableau Map Data Exploration  
![summary](https://github.com/CSE512-16S/a3-hyunsk-lklyne-ankitpotdar/blob/dev/readme_assets/tableauExplorationMap.png)  
  
> Tableau Histogram Data Exploration  
![summary](https://github.com/CSE512-16S/a3-hyunsk-lklyne-ankitpotdar/blob/dev/readme_assets/tableauExplorationTimeline.png)  

> Magnitude Color Encoding and Typography Exploration  
![summary](https://github.com/CSE512-16S/a3-hyunsk-lklyne-ankitpotdar/blob/dev/readme_assets/color-style-exploration.png)  

> Earthquake Explorer - In Progress  
![summary](https://github.com/CSE512-16S/a3-hyunsk-lklyne-ankitpotdar/blob/dev/readme_assets/earthquake-wip-1.png)

  

* All group members began by searching for interesting datasets and loading them into Tableau to find interesting depictions of the data. 
* Once we had settled on a dataset, we discussed different visualization models and then made rudimentary explorations with Tableau. . 
* Once we had settled on a dataset, Hyun setup the initial environment including d3js and dataMaps. 
* Hyun and Ankit handled most of the scripting. Ankit scripted most of the necessary data transformations to filter and sort. Hyun created the histogram and interactions, and the initial display of the map and marks. Ankit setup the magnitude slider as well as fallbacks for planned interactions. 
* All members made contributions to design. Lyle created the color scheme, typography, style guide, and implemented the final layout. 

  Exploring & Discussing Datasets: 6 man-hours each  
  Setup & Exploration: 3 man-hours each   
  Data handlers, Interactions, & Styling : 10 man-hours each   
