# Write-up

The development process to make the demo of the DinnR web app was not straight forward,
to say the least, but was very useful in gaining pragmatic skills to get from wireframe
to prototype to functional demo.

Creating the initial design was the easy part -- the team designers discussed which sketch to base the core design off of, and we all discussed the scope of the project: did we want it
to be IOS widget only? Would it have a main page? Would we build out the settings/onboarding
flows for the demo? We decided that the nature of the app (an app that made it easy to choose
dinner without too much thinking) was best demonstrated via a widget.

Once we got initial designs out, it became apparent that we would need it to be a wide (four app by two app) widget so that we didn't have to cram the restaurant names into a tiny square. Essentially the app displays three restaurants per food category. You can tap the restaurant icon to pull up the address and a link to their website, and you can swipe right or left in category view to look at different genres of food.

Once we determined the scope of functionality/visuals, we had to make a working prototype in Figma. This took hours. There was very limited information for *exactly* what we needed to do, which was make a three-stage carousel menu. We added the transitions and the on-swipe
event in Figma, but we could not get it to do anything until I duplicated the entire phone
background three times; one for each food genre. This allowed the transitions to work.

With the full prototype finished in Figma, we had to deploy it in a web browser as a working demo. With the (relatively) high complexity of our widget and the amount of assets we had to use, I, the dev, decided it would be best to leverage an LLM to push out the hundreds of lines of code necessary to duplicate the Figma prototype. I used the Anima plugin to get the 
HTML, and I copied over the CSS as well, into a new directory. Then, I downloaded most of the
relevant assets and put them in an assets directory. I put together a very specific prompt to
deliver to Claude Opus 4.5 in Cursor, as follows:

```
In this directory is code and assets for what will be a web browser demo of a mobile app. I have exported the code and assets directly from figma.

Included is a demo frame of an Iphone, with several components displayed inside a widget.

Requirements: The widget must be swipeable to move from the left-most carousel menu (Italian), to the middle carousel menu (Asian), to the last menu (Mexican). 

Each Icon needs to have a hover state that displays a different icon variant (not in the assets yet.), and only the spaghettiland icon needs to be clickable to open up a dialogue menu (as seen in @FigmaPrototype/Examples/BuiltOutExample.png ). If there are any missing assets, leave room for them later.

Let's work this out in a step-by-step manner to ensure that we adhere to the intended design in @FigmaPrototype/Examples/BuiltOutExample.png with functional and uniform scroll menus, hover states, and transitions.
```

Most of the work afterwards was putting the correct and high-resolution assets for each
component into a finalAssets directory, adjusting some formatting issues, and deciding
to implement a different form of hover state transition, since the hover transitions for
the text of each restaurant did not cleanly transfer over from Figma.

Once this all was done, I initialized and pushed changes to my GitHub repo,
https://github.com/CorbinCald/DinnR-App-Web-Demo, and added this document to it.
Overall, this was a great project to get us devs and designers some experience with
collaborating to deliver a project that looks great and functions well.