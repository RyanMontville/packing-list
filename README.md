# packing-list

A Angular web app built for MontesOwn.com that allows users to create packing lists for upcoming trips. The app uses a MySql database and a Fat-Free Framework php api to store the lists. The app uses local storage to store user tokens to allow multiple users that can be accessed across multiple devices without complicated user authentication and log in.

Some features of this web app that make it better than using your phone's notes or todo add:
* Set the date you are leaving for your trip with a countdown of how many days left until the trip
* The ability to view your lists across multiple devices / operating systems
* Reusability: You can reset the date leaving, which resets all items on the list to unchecked, eliminating the need to create the list each trip or unchecking each item individually
* Ability to have the list read out to you with Text-To-Speech. Great for reading out steps on a checklist, such as hooking up a camper trailer to your vehicle where it would be more convenient  for the list to be read to you rather than having to keep on checking your phone

A live demo of the web app can be viewed [here](https://ryanmontville.com/packing-list/). The demo version stores the list in local storage on your device, so there is no cross device support, but it will remember your lists for the next time you view the web app.
