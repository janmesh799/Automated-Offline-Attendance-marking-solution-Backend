import Realm from "realm";

// Set your Schema
const ListingSchema = {
  name: "Listing",
  primaryKey: "_id",
  properties: {
    _id: "objectId",
    location: "string",
    price: "int",
    bedrooms: "int",
  },
};

// Configure your App and login
const app = new Realm.App({ id: "application-upasthit-kneyq" });
const credentials = Realm.Credentials.emailPassword("email", "password");
const user = await app.logIn(credentials);

// Set the new Flexible Sync Config and open the Realm
const realm = await Realm.open({
  schema: [ListingSchema],
  sync: { user, flexible: true },
});

// Create a Query and Add it to your Subscriptions
await realm.subscriptions.update((mutableSubscriptions) => {
  mutableSubscriptions.add(
    realm
      .objects(ListingSchema.name)
      .filtered("location = 'dallas' && price < 300000 && bedrooms = 3", {
        name: "home-search",
      })
  );
});

// Now query the local realm and get your home listings - output is 100 listings
// in the results
let homes = realm.objects(ListingSchema.name).length;

// Remove the subscription - the data is removed from the local device but stays
// on the server
await realm.subscriptions.update((mutableSubscriptions) => {
  mutableSubscriptions.removeByName("home-search");
});

// Output is 0 - listings have been removed locally
homes = realm.objects(ListingSchema.name).length;