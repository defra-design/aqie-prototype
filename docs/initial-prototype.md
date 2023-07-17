---
title: The initial prototype
date: 2023-03-07
author:
  name: Paul Lloyd
  url: https://github.com/paulrobertlloyd
---

The vision for our service is to provide:

> The trusted service for understandable and reliable UK air quality information, empowering citizens to protect their health.

We can think of this service as having something akin to the BBC’s Reithian values. It should:

* **Inform** citizens about air quality in their local area (or at a given location)
* **Educate** citizens about how air quality and air pollution can affect their health
* **Engage** citizens, helping them to understand what action central and local government is taking to improve air quality and what actions they can take themselves.

While it’s already possible to get air quality information from several different sources such as weather forecasts or commercial services, this information is underpinned by data collected, interpreted and disseminated by (or on behalf of) DEFRA.

Besides any statutory requirement, as the authoritative source of air quality data, this information should be available from – look and behave like – a GOV.UK service, one that is accessible and easy to use.

## Ideation

The team held a series of ideation and prioritisation sessions, partially informed by [our initial novice and messenger personas](/personas). From these, a set of desirable and technically feasible features emerged:

* Get air quality information for a known location or postcode
* See improvements a local authority is making to air quality
* Get a weather forecast alongside air quality information
* Get an immediate/24-hour air quality forecast
* Get a short-term/5-day air quality forecast
* See an overview of areas in the UK with poor air quality
* Compare air quality across different regions and local authorities
* Get personalised alerts
* Find guidance on how air quality is measured
* Find guidance on the health and ecological impacts of different pollutants
* Find guidance on levels and thresholds

We want to understand how citizens currently use air quality information and their appetite for getting more detailed information from a GOV.UK service. Therefore, we are starting with a prototype that is broad in scope but shallow in detail. With subsequent rounds of research we can iterate some aspects while discarding any that don’t appear to serve user needs.

## Service landing page

From a GOV.UK start page, users are taken to the service’s landing page. This page provides an entry point into the different parts of the service. We prioritised information on this page as follows:

1. Get a forecast for a location
2. Air pollution summary forecast for the entire UK
3. Links to the 15 non-agglomeration areas
4. Links to help topics about air quality and pollution

We are not confident about the usefulness of a UK summary but have included it here to prompt discussion during research, particularly as such a summary features heavily on the [homepage of the UK-AIR website](https://uk-air.defra.gov.uk).

This page also surfaces guidance tailored to educating and engaging users about air quality, air pollution and related health effects. We have not prototyped any guidance pages yet, and are unsure where it might live. The titles and descriptions can prompt discussion about what information would be helpful and if this is where users’ would expect to find it.

## Air quality forecast for a location

The location forecast page uses the principle of progressive disclosure, showing a general overview before allowing users to dig deeper into different areas of information available on the service. Information is prioritised as follows:

1. A **5-day forecast**. Each day shows the DAQI band, index value and associated health advice and recommendations.

    The weather forecast for each day provides additional context, as does a table which shows the DAQI index for the five pollutants of concern.

    Information is shown about how the forecast is produced, with a link to the nearest monitoring station used to inform the data shown.

    If there are any air pollution alerts these are shown within the first day’s forecast. A prompt encourages users to subscribe to notifications.
2. There is then a brief summary about how the **air quality in this area** compares with other areas in the same non-agglomeration zone, with a link to a fuller comparison page.
3. The **local authority responsible for managing air quality** is given, with a link to that council’s page on the service.
4. Finally, we say if this area falls within a **small control area**, with a link to guidance on GOV.UK about what this means.

It is envisaged that forecasts for different locations could be discovered and accessed directly from web search engines.

## Local authority interventions

Local councils are responsible for managing and improving air quality in their area. On this page, we show some ways a local authority may be managing and reporting on air quality:

1. Local **air quality management areas** (AQMAs). These can be viewed as a list or as a map.
2. Any open **consultations** on an authorities air quality strategy
3. Previously published documents regarding air quality, such as **Annual Status Reports** (ASR)

Besides consultations, this information is currently available on the existing UK-AIR website. We are interested in knowing if users find this information useful or instructive.

## Regional air quality

We have less clarity about this area of the service. However, we can use this initial design to gauge users’ interest in understanding air quality at a regional level and use it to provide an entry point into pages for each local authority. It is also an opportunity to surface microgram values for pollutants and gauge users’ desire for precise scientific values.

***

## Screenshots

![Screenshot of start page.](/images/initial-prototype/1.png "GOV.UK start page")

![Screenshot of landing page.](/images/initial-prototype/2.png "Landing page")

![Screenshot of air quality forecast page, showing low levels of air pollution in Walsall, West Midlands.](/images/initial-prototype/3.png "Air quality forecast page (low pollution, DAQI explainer shown)")

![Screenshot of air quality forecast page, showing moderate levels of air pollution in Brighton, East Sussex.](/images/initial-prototype/4.png "Air quality forecast page (high pollution)")

![Screenshot of air quality forecast page, showing high levels of air pollution in Portsmouth, Hampshire.](/images/initial-prototype/5.png "Air quality forecast page (moderate pollution)")

![Screenshot of air quality forecast page, showing very high levels of air pollution in Westminster, London.](/images/initial-prototype/6.png "Air quality forecast page (very high pollution)")

![Screenshot of page listing AQMAs in Brighton and Hove.](/images/initial-prototype/7.png "Local authority page")

![Screenshot of page with map showing AQMAs in Brighton and Hove.](/images/initial-prototype/8.png "Local authority page (with AQMAs shown on a map)")

![Screenshot of a page showing air quality measurements in the South East.](/images/initial-prototype/9.png "Region page)")
