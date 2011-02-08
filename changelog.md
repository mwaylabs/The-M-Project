** Version 0.2 - Date 08.02.2011 **

  * Added Map and Location API: M.LocationManager, M.Location, M.MapView, M.MapMarkerView.
  * Added 'type' property to M.TextFieldView.
  * Fixed a bug with M.DialogView's automatically called 'dialogDidHide()' method.
  * Moved init of M.LoaderView to pageWillLoad() to prevent possible access errors.
  * Added title property to M.LoaderView.
  * Added changelog file.
  * Updated to jQuery 1.5 and jQuery Mobile 1.0a3.
  * Refactored M.SelectionListView to work with jQuery Mobile 1.0a3.
  * Renamed date provider from M.WhateverProvider to M.DataProviderWhatever (e.g. M.DataProviderLocalStorage).
  * Added utility object M.UUID for generating unique IDs.