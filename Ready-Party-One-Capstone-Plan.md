# **“Ready Party One” Capstone Plan**

### **I. Introduction**

**Objective**: Develop a responsive web application for tracking D\&D combat initiative, including players, monsters, HP, AC, turn order, and player facing combat information

**Tools and Technologies**: HTML, CSS (Grid, Flexbox, Media Queries), JavaScript, Fetch API, localStorage, and the D\&D 5e API

**Goals**:

- Create a clean, visually appealing, responsive web app  
- Use the D\&D 5e API to retrieve monster information  
- Create a DM View and Player View  
- Use JavaScript to store, update, and display initiative data

### **II. Responsive Design**

**Implementation**

**Media Queries**: Implement media queries to adapt the layout for mobile and desktop screen sizes

**CSS Grid and Flexbox**: Use CSS Grid and Flexbox to create flexible and responsive layouts

**Responsive Components**: Ensure all components, including initiative lists, forms, buttons, pop-up windows, and combat cards, adjust appropriately across different devices

### **III. Feature Implementation**

**Selected Features**

**Feature 1**: Use arrays, objects, sets, or maps to store and retrieve information displayed in the app

**Feature 2**: Validate user input and prevent invalid player or monster information from being saved

**Feature 3**: Persist important data to localStorage and make the stored data accessible after reload or refresh

**Feature 4:** Create a function that accepts two or more input parameters and returns a value determined by the inputs. The app will use a function to calculate player facing HP

**Integration of Third-Party API**

**D\&D 5e API**: Integrate the D\&D 5e API to search for pre-made monsters and display selected monster information within the app

### **IV. Data Handling and Analysis**

**Data Storage and Retrieval**

1. Store player, monster, HP, AC, condition, and initiative data in arrays or objects  
2. Implement functionality to add, update, remove, and retrieve this data as needed  
   **Data Display**  
1. Display the full initiative order in DM View  
2. Display simplified combat information in Player View  
3. Show the current turn using a visual indicator  
4. Display player and monster information in a clear and organized format

### **V. Advanced Features (Optional)**

**Additional Combat Features**

- Add optional fields for temporary HP, NPC types, ally and neutral labels and condition tags  
  **Interactive UI Features**  
- Implement round tracking, hidden monster information, HP descriptions for monsters (Uninjured, Barely Injured, Injured, Badly Injured and Near Death), and optional drag-and-drop initiative sorting on DM View

### **VI. Project Development**

**Pages and Routes**

**DM View**: The main page for managing initiative, adding players, adding monsters, updating HP, and controlling turn order

**Player View**: A separate page or route that displays simplified combat information for players

**API Interaction**

- Use the Fetch API to retrieve monster data from the D\&D 5e API  
- Allow the DM to search for pre-made monsters and add selected monster data to the initiative tracker  
  **JavaScript Functionality**  
- Use JavaScript to manage the initiative list, update combatant information, validate input, save data, retrieve data, and move through turns

### **VII. Review Process**

**Internal Review**

- Perform thorough testing to ensure the application works as intended  
- Validate the responsiveness and functionality of all components  
- Test adding players, adding custom monsters, adding API monsters, updating HP, moving through turns, and switching between DM View and Player View  
  **External Feedback**  
- Share the project with peers and mentors  
- Use their suggestions to make improvements to the app


### **VIII. Documentation and Final Submission**

**Code Annotation and Documentation**

- Include clear comments and explanations in the code  
- Write a README.md with:  
  - Project overview and objectives  
  - How-To/Setup instructions  
  - Data sources and API integration details  
  - AI usage

  **Final Submission**

- A functional and well-documented web app  
- Make sure the project is ready for the final presentation/submission

