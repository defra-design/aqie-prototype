---
title: The precision prototype
date: 2023-05-23
author:
  name: Paul Lloyd
  url: https://github.com/paulrobertlloyd
---

Findings from the third round of research with [the personalisation prototype](/the-personalisation-prototype) found that:

* finding information about local air quality was a top priority, followed by any action local councils are taking to improve it,
* people need to recognise their own air quality situation to trigger curiosity in the topic,
* most people approach air quality with a set of assumptions (it only affects certain groups, it has a single source, it is only a problem in certain areas),
* asking users to make an action plan is hard when they don’t understand the problem or they’ve yet to be ‘hooked’,
* people want to know more than just the overall air quality. Is it always at a certain level? Where does pollution come from? What is my long-term health risk?

## First round of research

We explored the precision theme over 2 rounds. The first round focused primarily on mapping.

Until this point, we mostly avoided using maps to illustrate air quality. Maps are not universally accessible and have the potential to provide an inaccurate or misleading picture, especially when air quality is modelled using data from a limited number of monitoring stations, with even fewer in rural areas.

However, the policy team is exploring opportunities to use more precise, potentially street-level forecasting data. We wanted to explore how users would understand air pollution when presented on a map and their appetite for more granular data.

We built a simple prototype that asked users for a location before presenting them with a map. The first view displayed the current air quality index value. Additional map options (based on [maps used by the London Air Quality](https://apps.london.gov.uk/air-quality/) service) used a more granular, street-level picture of Nitrogen dioxide and PM2.5. A side panel gave the current air quality index value, a 5-day forecast and the primary pollutant in this area, with links hinting at further information to explore.

We used the term ‘air pollution’ exclusively in this sidebar. This was to avoid the confusion we’ve observed when air quality, not air pollution, is described as low.

Findings from this first round showed that:

* users continue to see GOV.UK as an authoritative and trustworthy source for air quality information,
* maps are engaging and encourage interaction and exploration (we observed a desire to pan and zoom),
* using green on a map can be interpreted as being a neutral colour, not an indication of air quality,
* monitoring stations could be interpreted as locations with air pollution, not areas where air pollution is measured,
* there is less interest in a forecast for the coming days (as this information is changeable or unreliable),
* there is a keener interest in understanding the air quality right now, perhaps at hourly intervals,
* leading with technical terms like PM2.5 means this information is like to be ignored,
* that said, seeing where pollutants are in exceedance can spark interest – and concern.

## Second round of research

In the second round, we used mapping in a supportive role. This meant an interactive map wasn’t the only means of getting information about air quality and made it easier to expand on the information we could show.

We also wanted to dig deeper into preferences around the timescale for air quality information. How important is historical data? How useful is forecasting, given the likelihood of it being more inaccurate the longer the timespan? What is the appetite for forecasting air quality across the span of a day?

There was also an opportunity to revisit how we explain pollutants. Grouping them into 2 categories: gases and particles, meant we could lead into this information using simpler, better-understood terms.

Thinking again about narrative journeys through this information, we included an additional page that dug deeper into a pollutant at a particular location. Here we could show measurement graphs and the relationship to any management and improvement a council is undertaking in this area. This page in turn could link to an educational page within the service.

Finally, we added a list of industrial sites near a given location, sourced from the UK Pollutant Release and Transfer Register (PRTR). How might users interpret information about industrial sites?

In terms of mapping, we also looked to explore interest in viewing local air quality improvement measures layered over air quality measurements. Doing so might enable users to see the relationship between pollution and any measures being undertaken to reduce it.

***

## Screenshots

![Form with heading ‘Get the current air quality in your area’ and asking the user for their location.](../images/precision-prototype/1.png "Initial landing page")

![Map showing areas in green (low) and moderate (yellow) air pollution.](../images/precision-prototype/2.png "Initial location map (showing overall air quality)")

![Map showing street-level air pollution from NO2 using green, yellow and red.](../images/precision-prototype/3.png "Initial location map (showing NO2)")

![Map showing street-level air pollution from PM2.5 using shades of green and orange.](../images/precision-prototype/4.png "Initial location map (showing PM2.5)")

![Form with heading ‘Get the air quality in your area’ and asking the user for their location.](../images/precision-prototype/5.png "Revised landing page")

![Page including several sections that breaks down information about air quality in a location.](../images/precision-prototype/6.png "Air quality in Elephant & Castle, SE1")

![Page showing information about nitrogen dioxide in a location.](../images/precision-prototype/7.png "Nitrogen dioxide in Elephant & Castle, SE1")

![Page showing general information about nitrogen oxides.](../images/precision-prototype/8.png "Nitrogen oxides (NOx)")

![Map showing low-resolution air pollution, highlighting large areas with green and yellow.](../images/precision-prototype/9.png "Revised location map (showing current overall air quality)")

![Map showing low-resolution air pollution from NO2, highlighting large areas with blue, green and yellow.](../images/precision-prototype/10.png "Revised location map (showing yearly average NO2 concentration)")
