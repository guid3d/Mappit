# Mappit
🚀 A map-based social media application 🗺️


This repository contains all code written for the App "Mappit", developed as part of the TUM course
[IN2140 - Programming Database Web Applications](https://db.in.tum.de/teaching/ws2223/webdatabases/index.shtml?lang=en).


![Screenshot](https://user-images.githubusercontent.com/29707419/218763158-a1d8b1f6-fdfa-4c18-b49a-b65c6bbe8e7b.png)

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#introduction">Introduction</a></li>
    <li><a href="#getting-started">Getting started</a></li>
    <li><a href="#android-adaptations">Android adaptations</a></li>
  </ol>
</details>


## Introduction

Mappit serves as a social media platform specifically for users of public transportation. To do this, Mappit lets Users 
create Threads at every location of the Munich Public Transportation System, whether it being about lost items, ticket 
sharing or just meetups. 

One of the key features Mappit provides in that regards it the idea of Thread-Lifetime. Each thread, depending on the tag 
that is selected for it, gets a fixed amount of lifetime at its creation. When this lifetime goes below 15 minutes, users can 
choose to refresh it, keeping the thread alive for longer. Using this mechanism, Mappit wants the community themselves to 
filter relevant posts.

## Getting started

To run the app locally, the following steps have to be taken: <br />

1. Pulling the repository
```sh
  $ git pull https://github.com/guid3d/Mappit.git
```
<br />

2. Installing all remaining dependencies
```sh
  $ yarn
```
<br />

3. Starting the app
```sh
  $ yarn start
```
<br />

The app can then either be run locally on an emulator by pressing "a", while it can also be run on a mobile phone using the
app ["Expo Go"](https://expo.dev/expo-go) and scanning the shown QR code.

#### Caution: The app sadly experiences some performance issues when being run on an android phone. For more context, please refer to the next chapter.

## Android Adaptations

To run the app also efficiently on Android Phones, one has to do the following changes:

In the file 

<h5 a><code>/Mappit/views/Maps/index.js</code></h5>

the following lines of code(129-134) have to be commented out:

```
  marker: {
    width: 5,
    height: 5,
    backgroundColor: "blue",
    borderRadius: 10,
  },
```

While this is enough to test the apps main functionalities, the app also experiences some more performance and style issues 
when being run on Android - which is why we still recommend to run the app on iOS if possible to have a smoother experience.
