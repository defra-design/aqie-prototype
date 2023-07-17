---
title: The personalisation prototype
date: 2023-04-23
author:
  name: Paul Lloyd
  url: https://github.com/paulrobertlloyd
---

Findings from the second round of user research with [the education prototype](/the-education-prototype) found that:

* while location was a strong hook into the data, once presented, the text heavy design wasn’t engaging enough for participants who needed to be prompted to explore further,
* although we displayed data for a particular location, the content didn’t feel relevant or personal enough,
* where there was seen to be a personal connection, participants showed a greater interest and wanted to know more (even if this was having read quite technical information),
* PDFs, even if they looked to provide relevant information, were ignored.

## Narrative routes through data

From the last 2 rounds of research, we have observed the behaviour where participants look to find a narrative route through air quality information and data:

![Journey map showing different questions that a user may ask as they navigate air quality data.](/images/personalisation-prototype/narrative-routes.png)

But before this can happen they need to have an initial hook. This might be wanting to know more about air quality in their current location, or finding out that a certain pollutant may exasperate an existing medical condition. Only then do they start to dig into the information, and want to explore the topic some more.

Our hypothesis for this round was that, if we asked participants a series of questions about their personal circumstances, we could achieve a number of goals:

* educate users about the activities linked to air pollution,
* provide actions that people can take to reduce their exposure to air pollution and their contribution towards it,
* show personalised information and sign post users to relevant content located in different parts of the website.

The idea of encouraging users to create a clean air action plan was partly based on the [Clean Air Planner](https://planner.cleanairhub.org.uk/), a tool provided by the [Clean Air Hub](https://www.cleanairhub.org.uk), an information resource that was funded by Defra.

## Revisiting the presentation theme

The 2 previous prototypes used a typical service journey, starting on GOV.UK and following a somewhat linear journey through the information provided.

This was at odds with the different narrative journeys users were looking for. Rather than dictate a journey, instead we could provide a campaign-like website that leads with a strong and emotive call to action, and with different sections that users could explore on their own terms.

Using photos on the home page, the aim was to encourage engagement across all areas of the site, and make it appear less like a traditional GOV.UK service.

## Notifications and alerts

The theme of personalisation provided an opportunity to begin exploring the design of a notifications service.

The existing notification service provided the legacy UK Air website is not easily discoverable. The emails it sends are not accessible (they use technical terms) or actionable (they show readings from every monitoring station in the UK).

We identified 2 types of notification we could provide:

* **Air pollution alert** sent when air pollution in a location exceeds a certain level (moderate, high or very high) at a chosen frequency (after an immediate air pollution episode or when there has been prolonged exposure over a 30 day period).

    This email would also provide relevant health advice associated with respective the Daily Air Quality Index value, again providing actionable information to users.

* **Daily air quality summary**, sent daily and providing a forecast for the next few days, as well as information about the pollutants measured from the nearest monitoring station over the last 24 hours.

***

## Screenshots

![Screenshot of home page](/images/personalisation-prototype/1.png "Home page")

![Screenshot of air pollution landing page](/images/personalisation-prototype/2.png "Air pollution landing page")

![Screenshot of health effects landing page](/images/personalisation-prototype/3.png "Health effects landing page")

![Screenshot of action plan introduction page](/images/personalisation-prototype/4.png "Air quality action plan: Create your air quality action plan")

![Screenshot of form asking if the user has any health conditions](/images/personalisation-prototype/5.png "Air quality action plan: Do you have any of the following health conditions?")

![Screenshot of form asking user if they own their own home](/images/personalisation-prototype/6.png "Air quality action plan: Do you own your own home?")

![Screenshot of form asking how the user heats their home](/images/personalisation-prototype/7.png "Air quality action plan: How do you heat your home?")

![Screenshot of form asking if the user uses online shopping](/images/personalisation-prototype/8.png "Air quality action plan: Do you use online shopping?")

![Screenshot of form asking how the user commutes to work or school](/images/personalisation-prototype/9.png "Air quality action plan: How do you commute to work or school?")

![Screenshot of form asking if the user drives](/images/personalisation-prototype/10.png "Air quality action plan: Do you drive?")

![Screenshot of form asking if the user exercises outside](/images/personalisation-prototype/11.png "Air quality action plan: Do you exercise outside?")

![Screenshot of form asking user for their postcode](/images/personalisation-prototype/12.png "Air quality action plan: What is the first part of your postcode?")

![Screenshot of clean air action plan](/images/personalisation-prototype/13.png "Air quality action plan: Your clean air action plan")

![Screenshot of form asking which notifications the user wants to subscribe to](/images/personalisation-prototype/14.png "Notifications: Which notifications do you want to subscribe to?")

![Screenshot of form asking user at which level they would like to get alerts](/images/personalisation-prototype/15.png "Notifications: At what level would you like to get air pollution alerts?")

![Screenshot of form asking user when they would like to get alerts](/images/personalisation-prototype/16.png "Notifications: When would you like to get air pollution alerts?")

![Screenshot of form asking user where they would like to get alerts for](/images/personalisation-prototype/17.png "Notifications: Where would you like to get notifications for?")

![Screenshot of page asking for user’s email address](/images/personalisation-prototype/18.png "Notifications: What is your email address?")

![Screenshot of page allowing user to check their answers prior to subscribing](/images/personalisation-prototype/19.png "Notifications: Check your notification settings")

![Screenshot showing page with confirmation banner and answers that they can change and update](/images/personalisation-prototype/20.png "Notifications: Email notification settings")

![Screenshot of a mock email for an air pollution alert](/images/personalisation-prototype/21.png "Notification email: Air pollution alert")

![Screenshot of a mock email for a daily air quality summary](/images/personalisation-prototype/22.png "Notification email: Daily air quality summary")
