# Currency Converter App
## App Description
This specification will guide our development of the currency conversion app.

### Things we want it to do are:
1. Allow the user to set their home country.
2. Automatically get the user’s local currency from the country they enter.
3. Allow the user to select the country where they want to travel.
4. Detect and display the currency used in that country.
5. Display the current exchange rate between the user’s home country and their destination country.
6. Allow the user to enter an amount in their local currency and display its value in the destination currency.

### Possible stretch goals:
1. Allow the user to enter activities and locations to their itinerary in their destination country.
2. Alow the user to enter how much time they plan to devote to each activity.
3. Allow the user to enter travel time between destinations. 
4. Let them know when their day is full.
5. Allow the user to rearrange the items by drag-and-drop.
6. Allow the user to print the itinerary with a print style sheet that makes it look nice.

## Functional Specification
We need to define the objects and functions we’ll need to create:
1. Home country object
   a. Local currency
2. Destination country object
   a. Destination currency
3. Calculate rate function
   a. use API
