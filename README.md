# Project - Trip Design
<br>

## Description

A platform for travel advisors to create and share custom trip itineraries with their customers.

**Keywords:** Trip plan, custom itinerary, travel advisor app.
<br>



## Login Credentials

 Try the following login credential to see the admin view

**Email:** Admin123@admin.com

**Password:**  Admin123@admin.com



## User Stories

-  **Signup:** As an anonymous user I can sign up on the platform.
-  **Login:** As a user I can login to the platform so that I can access my profile and access the data I have access.
-  **Logout:** As a logged in user I can logout from the platform so no one else can use it.
-  **Travel Advisor Profile:** As a travel advisor I want to be able to see recent activities in my profile, so I can have a glimpse of the latest requested trips that I need to create, and manage the database.
-  **Create Trips:** As a travel advisor I want to have a trip creation tool where I can add information day-by-day and select hotels and experiences, so I can easily create custom itineraries for my clients
-  **Edit Trips:** As a travel advisor I want to be able to edit any itinerary I have created, so I can correct possible mistakes or adjust it after customer feedback.
-  **Delete Trips:** As a travel advisor I want to be able to delete any itinerary I have created, so I can correct remove it from the database.
-  **Cities Page:** As a travel advisor I want to be able to manage (see all, add new, edit and delete) the destinations available in the database.
-  **Accommodation Page:** As a travel advisor I want to be able to manage (see all, add new, edit and delete) the accommodations available in the database.
-  **Experiences Page:** As a travel advisor I want to be able to manage (see all, add new, edit and delete) the experiences available in the database.
-  **Customer Profile:** As a customer I want to be able to log in and have access to previous trip itineraries that have been created for me, so I can keep a history of all my trips.
-  **Trip Details:** As user with a valid trip itinerary link I want to be able to access the details of the trip.


## Backlog

- Enhance responsiveness
- Work on request details dialog
- Finish workflow requests and trip creation
- Add restaurants, shops and attractions models
- Notify customers via email that the trip itinerary is ready, so they can check on the platform.
- Show only list of hotels and experiences related to the specific city on add trip form
- Google API - Maps and Places
- <br>


# Client / Frontend
## React Router Routes (React App)

| Path           | Component       | Permissions                 | Behavior                                          |
|----------------|-----------------|-----------------------------|---------------------------------------------------|
| `/`            | HomePage        | public `<Route>`            | Homepage                                          |
| `/signup`      | SignupPage      | anon only  `<AnonRoute>`    | Signup form, navigates to home page after signup. |
| `/login`       | LoginPage | anon only  `<AnonRoute>`    | Login form, navigates to home page after login.   |
| `/profile`     | ProfilePage     | user only `<PrivateRoute>`  | Profile for the current user                      |
| `/create-trip` | CreateTripPage  | admin only `<PrivateRoute>` | Create a new trip form                            |
| `/trips/:tripId`     | TripDetailsPage | user only `<PrivateRoute>` | Show detailed day-by-day trip itinerary           |
| /`trips/:tripId/edit` | EditTripPage    | admin only `<PrivateRoute>` | Edit trip itinerary form                          |
| `/request-trip`       | RequestTripPage    | user only `<PrivateRoute>`  | Show request trip form                            |
| `/experiences`        | ExperiencesPage | admin only `<PrivateRoute>` | Manage Experiences Listing |
| `/accommodations` | AccommodationsPage | admin only `<PrivateRoute>` | Manage Accommodation Listing |
| `/cities` | CitiesPage | admin only `<PrivateRoute>` | Manage Cities Listing |

## Components
**Pages**

- LoginPage
- SignupPage
- HomePage
- ProfilePage
- CreateTripPage
- TripDetailsPage
- EditTripPage
- RequestTripsPage
- ItemsPage
  - CitiesPage
  - AccommodationsPage
  - ExperiencesPages


**Components**

- Navbar
- Footer
- AccommodationsList
- ExperiencesList
- CitiesList
- AddItem
- EditItem
- EditItemDialog
- ItemCard
- SearchItem

## Services

- **Auth Service**

  - `authService` :
    - `.login(user)`
    - `.signup(user)`
    - `.verify(user)`

<br>


# Server / Backend


## Models

**User model**

```javascript
{
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  image: { type: String, default: imgURL' },
  createdTrips: [{ type: Schema.Types.ObjectId, ref: 'Trip' }],
	requestedTrips: [{ type: Schema.Types.ObjectId, ref: 'Trip' }], 
},
{
  timestamps: true
}
```

**Trip Model**

```javascript
{
  tripName: { type: String },
  coverImg: { type: String, default: 'imgURL'},
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  requestedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  startDate: { type: String },
  endDate: { type: String },
  duration: { type: Number },
  pax: { type: Number },
  coverMsg: { type: String },
  destination: [{
    city: { type: Schema.Types.ObjectId, ref: 'City' },
    accommodations: [{ type: Schema.Types.ObjectId, ref: 'Accommodation' }],
  }],
  days: [
    {
      experiences: [{ type: Schema.Types.ObjectId, ref: 'Experience' }],
    }
  ],
  request: { type: Schema.Types.ObjectId, ref: 'Request' }
}
```

**Trip Model**

```javascript
{
  tripName: { type: String },
  coverImg: { type: String, default: 'imgURL'},
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  requestedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  startDate: { type: String },
  endDate: { type: String },
  duration: { type: Number },
  pax: { type: Number },
  coverMsg: { type: String },
  destination: [{
    city: { type: Schema.Types.ObjectId, ref: 'City' },
    accommodations: [{ type: Schema.Types.ObjectId, ref: 'Accommodation' }],
  }],
  days: [
    {
      experiences: [{ type: Schema.Types.ObjectId, ref: 'Experience' }],
    }
  ],
  request: { type: Schema.Types.ObjectId, ref: 'Request' }
}
```

**Request Model**

```javascript
{
  destination: [{ type: Schema.Types.ObjectId, ref: 'City' }],
  requestedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  tripPlan: { type: Schema.Types.ObjectId, ref: 'Trip' },
  startDate: { type: String },
  endDate: { type: String },
  duration: { type: Number },
  pax: { type: Number },
  budgetPerPerson: { type: Number },
  typeOfAccommodation: { type: Array },
  detailsOccasion: { type: String },
  activitiesToInclude: { type: Array },
  specialRequest: { type: String },
  status: { type: String, default: 'pending'},
},
{
    timestamps: true
}
```

**Experience Model**

```javascript
{
  name: { type: String },
  description: { type: String },
  img: { type: String, default: 'imgURL'},
  category: { type: String },
  externalUrl: { type: String },
  affiliateUrl: { type: String },
  city: { type: Schema.Types.ObjectId, ref: 'City' }
}
```

**City Model**

```javascript
{
  name: { type: String },
  description: { type: String },
  country: { type: Schema.Types.ObjectId, ref: 'Country' },
  img: { type: String, default: 'imgURL'},
  accommodations: [{ type: Schema.Types.ObjectId, ref: 'Accommodation' }],
  experiences: [{ type: Schema.Types.ObjectId, ref: 'Experience' }],
}
```

**Accommodation Model**

```javascript
{
  name: { type: String },
  description: { type: String },
  img: { type: String, default: 'imgURL'},
  category: { type: String },
  externalUrl: { type: String },
  affiliateUrl: { type: String },
  city: { type: Schema.Types.ObjectId, ref: 'City' }
}
```

<br>


## API Endpoints (backend routes)

| HTTP Method | URL                     | Request Body                  | Success status | Error Status | Description                                                  |
| ----------- | ----------------------- | ----------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| POST        | /auth/signup            | {name, email, role, password} | 201            | 500          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | /auth/login             | {username, password}          | 200            | 500          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| GET         | /auth/verify            | Saved token                   | 200            | 500          | Check if the user has the authorization token to access the app |
| GET         | /api/trips              | -                             | 200            | 500          | Show all trips                                               |
| POST        | /api/trips              | {trip form body}              | 201            | 500          | Add a trip itinerary                                         |
| PUT         | /api/trips/:id          | {trip form body}              | 200            | 500          | Edit a specific trip itinerary                               |
| GET         | /api/trips/:id          | {_id}                         | 200            | 500          | Show a specific trip itinerary                               |
| DELETE      | /api/trips/:id          | {_id}                         | 204            | 500          | Delete a specific trip itinerary                             |
| GET         | /api/requests           | -                             | 200            | 500          | Show all trip requests                                       |
| POST        | /api/requests           | {trip form body}              | 201            | 500          | Add a trip requests                                          |
| PUT         | /api/requests/:id       | {trip form body}              | 200            | 500          | Edit a specific trip requests                                |
| GET         | /api/requests/:id       | {_id}                         | 200            | 500          | Show a specific trip requests                                |
| DELETE      | /api/requests/:id       | {_id}                         | 204            | 500          | Delete a specific trip requests                              |
| GET         | /api/experiences        | -                             | 200            | 500          | Show all experience                                          |
| POST        | /api/experiences        | {trip form body}              | 201            | 500          | Add a experience                                             |
| PUT         | /api/experiences/:id    | {trip form body}              | 200            | 500          | Edit a experience                                            |
| GET         | /api/experiences/:id    | {_id}                         | 200            | 500          | Show a specific experience                                   |
| DELETE      | /api/experiences/:id    | {_id}                         | 204            | 500          | Delete a specific experience                                 |
| GET         | /api/cities             | -                             | 200            | 500          | Show all cities                                              |
| POST        | /api/cities             | {trip form body}              | 201            | 500          | Add a city                                                   |
| PUT         | /api/cities/:id         | {trip form body}              | 200            | 500          | Edit a city                                                  |
| GET         | /api/cities/:id         | {_id}                         | 200            | 500          | Show a specific city                                         |
| DELETE      | /api/cities/:id         | {_id}                         | 204            | 500          | Delete a specific city                                       |
| GET         | /api/accommodations     | -                             | 200            | 500          | Show all accommodations                                      |
| POST        | /api/accommodations     | {trip form body}              | 201            | 500          | Add an accommodation                                         |
| PUT         | /api/accommodations/:id | {trip form body}              | 200            | 500          | Edit an accommodation                                        |
| GET         | /api/accommodations/:id | {_id}                         | 200            | 500          | Show a specific accommodation                                |
| DELETE      | /api/accommodations/:id | {_id}                         | 204            | 500          | Delete a specific accommodation                              |



<br>


## Links

### Git

[Client repository Link](https://github.com/karinaglf/ironhack-project-trip-design-client)

[Server repository Link](https://github.com/karinaglf/ironhack-project-trip-design-server)

[Deployed App Link](https://trip-design.netlify.app)

### Slides

[Slides Link](https://www.canva.com/design/DAEyyXlwtn4/RO_ifKAFoyVter4XSQibZg/view?utm_content=DAEyyXlwtn4&utm_campaign=designshare&utm_medium=link&utm_source=sharebutton)