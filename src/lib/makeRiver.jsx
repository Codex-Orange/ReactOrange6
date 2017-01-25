import _ from 'lodash';
import Bacon from 'baconjs';
//==========================
function makeRiver() {
    return new Proxy({}, {
        get: function (target, name) {
            if (target[name] === undefined) {
                var bus = new Bacon.Bus();
                bus.name_ = name;
                bus.onValue(function (value) {
                    bus.value_ = value
                });
                bus.onValue(function (value) {
                    app.action.loopLog("stream " + name + " " + value.toString())
                });
                bus.uPush = function (value) {
                    if (!_.isEqual(bus.value_, value)) {
                        bus.push(value);
                    }
                };
                target[name] = bus;
            }
            return target[name];
        }
    });
}
export default makeRiver;