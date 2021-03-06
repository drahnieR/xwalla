/*    Copyright 2020 Firewalla Inc
 *
 *    This program is free software: you can redistribute it and/or  modify
 *    it under the terms of the GNU Affero General Public License, version 3,
 *    as published by the Free Software Foundation.
 *
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU Affero General Public License for more details.
 *
 *    You should have received a copy of the GNU Affero General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

const MSG_NETWORK_CHANGED = "System:network_changed";
const MSG_SYS_NETWORK_INFO_UPDATED = "System:network_info_updated";
const MSG_SYS_NETWORK_INFO_RELOADED = "System:network_info_reloaded";
const MSG_FR_CHANGE_APPLIED = "firerouter.change_applied";

module.exports = {
  MSG_NETWORK_CHANGED,
  MSG_SYS_NETWORK_INFO_UPDATED,
  MSG_SYS_NETWORK_INFO_RELOADED,
  MSG_FR_CHANGE_APPLIED
}