let Helper = {
  langChecker(lang, item, column) {
    switch (lang) {
      case "en":
        if (column == "title") {
          return item.title;
        } else if (column == "description") {
          return item.description;
        }
      case "ar":
        // Arabic Check:
        if (column == "title") {
          if (item.translations.length == 0) {
            return item.title;
          }
          // if have translation
          let _haveTrans = false;
          let _value = "";
          item.translations.forEach((trg, index) => {
            if (trg.column_name == "title") {
              _haveTrans = true;
              _value = trg.value;
            }
          });
          if (_haveTrans) {
            return _value;
          } else {
            return item.title;
          }
        } else if (column == "description") {
          if (item.translations.length == 0) {
            return item.description;
          }
          // if have translation
          let _haveTrans = false;
          let _value = "";
          item.translations.forEach((trg, index) => {
            if (trg.column_name == "description") {
              _haveTrans = true;
              _value = trg.value;
            }
          });
          if (_haveTrans) {
            return _value;
          } else {
            return item.description;
          }
        }

      default:
        if (column == "title") {
          return item.title;
        } else if (column == "description") {
          return item.description;
        }
    }
  },
  coinsLogsChecker(title, coinsLogs) {
    let has = false;
    coinsLogs.forEach((trg, index) => {
      if (trg.way == title) {
        has = true;
      }
    });

    return has;
  },
  check_values: function (values) {
    let error = 0;
    values.forEach((trg) => {
      if (trg == "") {
        error = error + 1;
      }
    });
    return error == 0 ? true : false;
  },
  FixTimeZone: function (offset) {
    let Fixer = -1;
    let timeZone = offset * Fixer;
    timeZone = timeZone / 60;
    return timeZone;
  },
  FixDate: function (date) {
    let fixedDate = new Date(date);
    let month = fixedDate.getMonth() + 1;
    let year = fixedDate.getFullYear();
    let day = fixedDate.getDate();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    return year + "-" + month + "-" + day;
  },
  DataNumber: function (date) {
    let fixedDate = new Date(date);
    let month = fixedDate.getMonth() + 1;
    let year = fixedDate.getFullYear();
    let day = fixedDate.getDate();

    return { year, month, day };
  },
  PraysFilter(prays) {
    let filterPrays = [];

    for (let pray in prays) {
      switch (pray) {
        case "fajr":
          filterPrays.push({ text: pray, time: prays[pray] });
          break;
        case "dhuhr":
          filterPrays.push({ text: pray, time: prays[pray] });
          break;
        case "asr":
          filterPrays.push({ text: pray, time: prays[pray] });
          break;
        case "maghrib":
          filterPrays.push({ text: pray, time: prays[pray] });
          break;
        case "isha":
          filterPrays.push({ text: pray, time: prays[pray] });
          break;
        default:
          break;
      }
    }

    return filterPrays;
  },
  fixPrayName(pray) {
    let name = "";
    switch (pray) {
      case "fajr":
        name = "الفجر";
        break;
      case "dhuhr":
        name = "الضهر";
        break;
      case "asr":
        name = "العصر";
        break;
      case "maghrib":
        name = "المغرب";
        break;
      case "isha":
        name = "العشاء";
      default:
        break;
    }
    return name;
  },
  hour24to12(hour) {
    
    let hourSplice = hour.split(":");
    let hourHour = hourSplice[0];
    hourHour = parseInt(hourHour);
    let fixedHour
    let type;
    if(hourHour <= 12) {
      fixedHour = hourHour
      type = "ص"
    }else {
      fixedHour = hourHour - 12
      if(fixedHour < 10) {
        fixedHour = "0" + fixedHour
      }
      type = "م"
    }

    return fixedHour + ":" + hourSplice[1] + ' ' + type
  },
};

export default Helper;
