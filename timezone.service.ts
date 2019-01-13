import { Injectable } from '@angular/core';
import * as moment from 'moment-timezone';

@Injectable()
export class TimezoneService {
  /**
   * @returns timezone
   */
  getUserTimeZone() {
    const userData = JSON.parse(localStorage.getItem('user_data'));
    if (userData) {
      return userData.timezone;
    } else {
      return moment.tz.guess();
    }
  }

  /**
   * Return today
   */
  getToday() {
    return moment().utc().tz(this.getUserTimeZone()).format('hh:mm A MMM DD, YYYY');
  }

  /**
   * @returns utc
   */
  getUtc(date: any) {
    return moment().valueOf();
  }

  /**
   * @returns utc of selected date in organization timezone
   */
  getOrganizationUtc(date: any) {
    const d = moment(date).format('DD-MM-YYYY hh:mm A'); // date to a string without timezone info
    return moment.tz(d, 'DD-MM-YYYY hh:mm A', this.getUserTimeZone()).utc().valueOf();
  }

  /**
   * @returns utc of any date
   */
  getStartOfDate(date, format) {
    return moment.tz(date, format, this.getUserTimeZone()).startOf('day').valueOf();
  }

  /**
   * @returns year
   */
  getYear(date) {
    return moment(date).tz(this.getUserTimeZone()).format('YYYY');
  }

  /**
   * @returns Month
   */
  getMonth(date) {
    return moment(date).tz(this.getUserTimeZone()).format('MM');
  }

  /**
   * @returns Day
   */
  getDay(date) {
    return moment(date).tz(this.getUserTimeZone()).format('DD');
  }

  /**
   * @returns maximum previous time available for adding patient details
   */
  getMinimumDate(type: string) {
    const utcToday = moment.tz(this.getUserTimeZone()).valueOf();
    const userData = JSON.parse(localStorage.getItem('user_data'));
    const configuration = userData.configuration.careprovider;
    const minUtc = utcToday - configuration[type].max_previous_time_selection;
    if (type === 'medical_compliance') {
      return moment.tz(minUtc, this.getUserTimeZone()).format('YYYY-MM-DD');
    } else {
      return moment.tz(minUtc, this.getUserTimeZone()).format('hh:mm A MMM DD, YYYY');
    }
  }

  /**
   * @returns is editable
   */
  isEditable(type, createdTime) {
    const utcToday = moment.tz(this.getUserTimeZone()).valueOf();
    const userData = JSON.parse(localStorage.getItem('user_data'));
    const configuration = userData.configuration.careprovider;
    const editableUpto = createdTime + configuration[type].max_edit_time;
    return editableUpto >= utcToday;
  }
  /**
   * @returns is deletable
   */
  isDeletable(type, createdTime) {
    const utcToday = moment.tz(this.getUserTimeZone()).valueOf();
    const userData = JSON.parse(localStorage.getItem('user_data'));
    const configuration = userData.configuration.careprovider;
    const editableUpto = createdTime + configuration[type].max_delete_time;
    return editableUpto >= utcToday;
  }
}
