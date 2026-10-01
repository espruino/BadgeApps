/*
require("Storage").writeJSON("ha.json", {
  auth_key : "...", // get this fro Home Assistant
  template : JSON.stringify({
    battery: "{{ states('sensor.battery') }}",
    pv: "{{ states('sensor.pv') }}",
    load: "{{ states('sensor.load') }}",
    grid: "{{ states('sensor.grid') }}",
    soc: "{{ states('sensor.battery_soc') }}"
  })
});
*/
let config = require("Storage").readJSON("ha.json");


const REQUEST_OPTIONS = {
  host: 'gw235.synology.me', // host name
  port: 18123,            // (optional) port, defaults to 80
  protocol: 'https:',   // optional protocol - https: or http:
  headers: {
    'Authorization': "Bearer "+config.auth_key,
    'Content-Type': 'application/json',
  },
};

let json = {};
let image = atob("+rgCVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVlVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVZVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVWVVVVZVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVlVVlVVVXVVWVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVZVVVVVWVVdVVVWlVWVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVlVVVVVlVXVVVV5VW1VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVaVZVVVVVdVVlVVVdZVpVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV1VlVVVZXVVZVVVbVVtVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVbVZVVVVV5VXlVVWmVbVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVpV1VZVZaVVlVVV5lXlVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVXlZVWVWWlVaVVVeZW1VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVtV1VtVldVXlVVaWVpVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVWlaVXVWXVVtVVW2VdVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVdV1VpV1lVbVVVp1bVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVleVXVZaVW1VVddWVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVZW1VpWllVtVVXaV1VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVleVbVddVfVVWnlZVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVW5V1XWVWpVVl1ZVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVbVaVplVuVVZtWVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVW5V1bVVfVVWeVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVbVeW1lWpVVXlVVVVlVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVW5W1eVVuVVW5VVVVlVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVbleXlVblVV+VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVW9WltVW9VVeVVVVZVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVbldblVrVVblVVVZVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVW+Wl5VelVW9VVVaVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVbldeVX+VV6VVVXVVVVVVVVVVVVVVVVrlVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVW+WX1VulVulVVWVZVVVVVVVVVVVVVb//9VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVblZuVbpVe5VVW1aVVVaVVVVVVVVVf+q/5VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVaVVVVVVVVVVW6Va1X+VXtVVV1aVVVdVVVVVVVVVv6qqvX1VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVeVVVVVVVVVVf1V9VrlW+VVV5bVVVtVVVVVVVVVfqqqq//1VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVuVVWlVVVVVWuVeletV7lVVtbVVVtVVVVVpVVVf6qqqr6/VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVvlVXlVZVVVb5W9X6VepVVtblVW5VVVVaVVVVX6qqqqqr1VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVWVVvlVblVpVVWuVuVvla+VVeblVW5VVVVpVaVVV+qqqqqq//1VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVbVW7lVblWlVVfpb5aNX4VVfblVW5VVVW5WvVVVuqqqqqqr6/lVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVflW/lVeVaVVW+V6VVVq1Vbr1Vb1VVVr1a9VVVfqaqqqqq6q9VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVvlW/pVtV5VVb5VVVVVZVbrpVblVVW+lr5VVV/6qqqqqqqqr1VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVvpa+pVpW1VW5VVWWVVVb75VblVVb6WvlVVVfqqqqqqqqqq9VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVvpbvpVVeVVVVb///5VWvpVvlVVvqa+VVVVfqqqqqqqqqqv/1VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVvpbvpVV+VVW/////+VayVulVa+qfpVVVVX6qqqqqq6qqrr/VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVvprv5VW5VX////6/+VaV/lVvrp+VVVVVVuqqqqquqqqqqr9VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVvprv6VeVb/////q/9VWulW+uq5VVVVaX/qqqqqqqqqqqqvVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVv6uv6VVf//+q6/6/5V+lb67rlVVVV//76qmqqqqqqqqqr//1VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVWj6+r6Vf//qqqq/v/VbV++vqVVVVV/r6qqqqqqqqqqqqqv//lVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVWsruulf/+qqqqq/v+Vq66+pVVVVV+qqqpqqqqqqqaqqqrqr9VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVWujr1f/6qqqqqq//1XuviVVVVVVfqqqlqqqqquqmqqr+qqvlVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVW6vpb/66qqqqqr//Vu+JVVVVVa/pqqqqqqqqqqqqqqv6qr9VVVVVVVVVVVVVVVVVVVVVVVVVVVWmVVVVVVVVW65X/6+qqq6qqv/9XolVVVVq/m6aqqqqqqqqqqqqqr+q6//VVVVVVVVVVVVVVVVVVVVVVVVVVVVW6pVVVVVVWxX/++qqrqqqq//VuVVVVr/qVeaqqqqqqqqqqqqrqqr///1VVVVVVVVVVVVVVVVVVVVVVVVVVVVVb+qlVVVVWV/++qqqqqqqv/9VVVWr+6VVXmqqqqqqqqqqqqq/6qr//9VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVv/6pVVVV//+qqqqqqqq//VVWr76lVav6aqqqqqqqqqqqq//qqr/9VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVWv++qVVf//qqqqqq6qr/9WvvrpVq//+mmqqquqmqqqqqv/+vq//1VVVVVVVVVVVVVVVVVVVVVVVVVqqqllVVVq+//5b//6qqqqqqqq//W+uuVa+qVKWmqqrqqqqqqqqq////v//VVVVVVVVVVVVVVVVVVVVVVVVVVa//++pVVVuruX//6qqqqqqqur/1fvlVZVcz5pqqqqqqqqqqqqqqv/////1VVVVVVVVVVVVVVVVVVVVVVVVVVVVZqrqlVVa7l/v+qqqqqqqqq/+WpVVVVr/ummqqqqqqqqqqq6qqr////9VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVlfv/uqqqq6qqqvv1VVVVqr+qpaqqqqqqqqqqqu6qqr////VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVaZX7/7qqquqqqqr79aZVVVV+mqpqqqqqqqqqqqvv+v6////1VVVVVVVVVVVVVVVVVVVVVVVVVVVVVlqqrr7//V+/++qqqqqq6q+/W//++pfpqqaqqqqqquqqrqv+r//////1VVVVVVVVVVVVVVVVVVVVVVVVar7///v++u6rlvv+vqqqqqqqqrv1uuu+//+qqqqqqqqqrqqq+qqqv//////lVVVVVVVVVVVVVVVVVVVVVVVVVVZZVVaq+vvhX6/76qqqqqqqrr9b7Kyur/mqqaqaqqqq+rr/qr+q//////9VVVVVVVVVVVVVVVVVVVVVVVVVVVVVaqvvuvrV+/+vqqqqq6qq6/WpVVVV+pqqqqqquqqrq+v6v/////////1VVVVVVVVVVVVVVVVVVVVVVVVVVaq+++yqpWVfr7r6quqqqqqqv1vqVVViqqqqqqqrqqr6v6+v/////////5VVVVVVVVVVVVVVVVVVVVVVVVar7/qlVVVVWuX++6/qqqqqqrqv1bv6lVfqqqqqqqq6qq6qqqr/r///////9VVVVVVVVVVVVVVVVVVVVVVVWqZZVVVVVVVvrl/vqv+qqquqqqr9X7r+pX6qqqqqqqvqqyqqqr/q////////1VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVb6/pX7+q/6qqqqqqr/V667ADKqqqqqq6qKv86qqq/6/z///////VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVWvvrrV//qv/6qqqq6q/1VoAAwA6qqqqqoqiq/Oqqr/+v8///////5VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVv76yjlf7+q//qqqqqq/1ZVTqrqACqqqqqjrqvw6qq//r8////////5VVVVVVVVVVVVVVVVVVVf9VVVVVVVb67r66VV//qr/+qqrqqv9bpUqqKqgqqrqqqCyq8Orqz//8P+r////7/1VVVVVVVVVVVVVVVVVV/yVVVVVVWvvu+KVVVf/+qr/8Pqquv+W+mKsA6qKqqqqqrA//zq/8//8P+q///+qq/VVVVVVVVVVVVVVVVVV/8VVVVVVr66+ylVVVV//6+r8AA7uv/V6/wAo8DyqqqqqqsD/w6/8//8P/+/+r+qqr1VVVVVVVVVVVVVVVVXPwVVVVVb+rr6lVVVVpb//r6rLLADv/VuurLqKrAqqqqr6qsP/P//P/8Pz//+quqv/tVVVVVVVVVVVVVVVVVV5VVVVWvqv+pVVVVVvV//+v6Oiq8ADlVuuyqjqoqqqqv/qqw/z//z/AAD//+qqqv//VVVVVVVVVVVVVVVVVVVVVVVr6r+qVVVVVVvpX//+vCrPqrwA1W+sj4s7Kqqqr/+qrD8P/zAP/////qqqqv/1VVVVVVVVVVVVVVVVVVVVVW6W//lVVVVVV+vlf///yug/+qrACW+KuKqCqqqqqsqqsPD/8z////+vqqqqr/9VVVVVVVVVVVVVVVVVVVVVuVr//zVVVVVW76VV//vwoKP//+qsADiojroqqquqq+v6M///8////+qpaqqq//VVVVVVVVVVVVVVVVVVVVaVb6/6q9f9VVWuuV5W//ooCs//P/+qwAyooPKqqo6qoq+swz/M///r+qqqqqr//1VVVVVVVVVVVVVVVVVVVVWvlfqqrz/1VW+5VvlX/87AKD///8/6rLqKqOqqqzqrKvvz8/zP//q+qqqqqq//9VVVVVVVVVVVVVVVVVVVVblVfqqquqvVW6pVu+VX8KAAoP/P////y7g6oqr6sP/z/7/Pzz////vqqqqqqqvvVVVVVVVVVVVVVVVVVVVVVVVX6qqqqa9X+lVvqVVXKAAKgPw/8//8+Lo8Ov+vw/8P//888z////6qqqqqqq71VVVVVVVVVVVVVVVVVVVVVVb6qqqqpvX6VVeiVWVygAArPPw/z/zKqKqgAD//D/z///PPM+//+qqqqqqqq+9VVVVVVVVVVVVVVVWqVVVVVf+qqqqqq//VVbqVW+igAACj//8A//Csg+orgAP8P8///88/Pq/qqqqqqqrquvVVVVVVVVVVVVVVVaqpVVVVX6quqqqpuv5tbuVV6wsADw7P/P/8MwioqAP+vwD8DD///PD///qqqqqqqqqqr1VVVVVVVVVVVVVVVaqVVVW76qqqqqqqqv+b6VVfgoAA8Cg/////wLqKqz///8Pw/P//88z//qqqqqqqqqqr9VVVVVVVVVVVVVVVVVVVVv/+qqqq6rqqq6XpVVagoAA/wKD/P/P/y/w+s8/8/w/zw///PP//6qqqqqquqqr/VVVVVVVVVVVVVVVVVVVVv+7qqqq+qqqqom+VVX4KAAP/DsPz///864osPP/P/D/Dz//z/P/6qqqqqq6qqq/1VVVVVVVVVVVVVVVVVVVf6qqqqqqq76qq65VVVrKAAP/wKw/D/P/CuK6g8P8/8//P////z/+qqqqqqqqvqv5VVVVVVVVVVVVVVVVVVVf6qqrqqqr//6qv+VVVtCgAD//AoP/wM/8Igys/8DP/D/8z///8//qmqqqqqqr+r+VVVVVVVVVVVVVVVVVVVX6aquqqqq//+6r/OVVeigAD//8Oj///8ADoqMP///AAP/DP/zzP/+qqqqq6qr/r+lVVVVVVVVVVVVVVVVVVX+qqqquqqqv//+qv9VXTsAD///AoP8///8KKuj/////w/88//Pz//mqqqqqqq///9VVVVVVVVVVVVVVVVVVV/qqqqqqqvq///qqvVWsoAA+q/8Cg/z///ws7s8/z///D/zP//8//+qqqqqquv7/rVVVVVVVVVVVVVVVVVVVfqqqqqqqq////6qq9V04AA////w6P/P///MqwAD/P8/w//P/z/P/+qqqqqrr/6qq1VVVVVVVVVVVVVVVVVVV+qqqqqqrr/////qvVoKAAP8AD/CsPw///wKqj/ww/D/D/zz/8z//mqquqq+/+qqtVVVVVVVVVVVVVVVVVVVfqqqqq66v////v+r1ZKAAPwDs/wKDPA/z/ACs/z/wMP8P/PP/8//qqqqqqvr/6qvVVVVVVVVVVVVVVVVVVVb6qqqqqqr////r+qtWOwAP8qq//Do//wAD8AAD////8AD/zzz/P/qqqqqqq+v/q/1VVVVVVVVVVVVVVVVVVv+qqqqqqq//////qvWygAD8K6j/wOD////AAAAPz/z//8P/PM/z86qqqqqrr6+/P9VVVVVVVVVVVVVVVVVVf+qqqqqqr+r////6r1TgAD/yuo//AoP8/8/8AAA/P//8/w/z/P8cOqqqqqq/+rrz/VVVVVVVVVVVVVVVVVVf/qqaqqqqqqv///6q1coAA/8rqP/8Oj/z///wAAPw/z///D/PD/HP6qqqqqq+qq8/lVVVVVVVVVVVVVVVVVv/qqqqqqqqqq////69UoAA+8KAP//A7P8/8//AAAPAMP8/wVT//xNuqqqqqrqqqvP9VVVVVVVVVVVVVVVVVf66qqqqqqqqqv///+v0KAAP/ziY//8CgAD/z/wAAD//8AD/BWP/Pxfqqq+qr6rqvz/VVVVVVVVVVVVVVVVVf6qqqqqqqqqqq////qvKAAPv8rqP//wKP/Dw//MAAP////AA1T/8Afqqqqqqv7P/w/1VVVVVVVVVVVVVVVVX6qqqrqqqqqvuvv///rOwAPv8Kqj///Ds///8ADAAD8///8/zX/P/7qqquvqr/D/8/9VVVVVVVVVVVVVVVVV+qqqqqqq6qrvr7///6ygAD3/yuo///wKD/////wAAPz/P//8Fj/PPqqqrq/7/8//P8VVVVVVVVVVVVVVVVVfqqq6qqqqqrK7/////igAD7/8rqP///Ao/8/////AAMP8/8/wU//x6qqq/r8P/P/z8FVVVVVVVVVVVVVVVVX6qqqqqrrrqyq/////woAA5/8JDz///8Kz/P/z//8AD8DD/z/NP/Meqqqr6qsPz/z89VVVVVVVVVVVVVVVVV+qqqqq6qKq8qv////8oAA9//AAA////AoDA//P//8AP/PAA/8z//Hqqqq/qqA8/8D/VVVVVVVVVVVVVVVVVX6qqqquqir/P//+//87AA+f/wAAD///8Cg/8Az//PwD////8AA/zx+qqur/r/A/88/1VVVVVVVVVVVVVVVVVvqqqq76o//z//+v/8KAAPf/8wz/////w7P///8MA/wP/P/8/8P/zXqq6q///zD/M/9VVVVVVVVVVVVVVVVVX6qqqsD/z/8//Pv//OwAPr/////////8Cg//////wPw//////w/81/rrqr///P/z//VVVVVVVVVVVVVVVVVX6uqq6oP8//P/P/6rCgAD3//////////wKP//////8Pw/D/8//D/9W/+/rP//zPzPq1VVVVVVVVVVVVVVVVV+qqqqqsPP/z/Ov6/ygAD2///////////Ds//z/8////w/D/D/w/zVX/v/z//8z8P6tVVVVVVVVVVVVVVVVV+ququqq8A/8/Cqv/zoAA5////+uuv///wKD/8P/z/8////APD/D81V/+v/P//z8z/rVVVVVVVVVVVVVVVVVfrr6qrqrz//MPqv/8oAA9pppZaf//////Aqqvv/M/////////AwPxVf///z+v8w//8FVVVVVVVVVVVVVVVVW6+uqq6r/w/zD///87AA+ab7////ww///8Ov+qqq//8//P/z///w8VX////CqvPM/8NVVVVVVVVVVVVVVVVVfr6qqo6/zP8z///8KAAP//wAAAPP/////AAAAAD6qu//w/////8DFV///6g+vz/P88VVVVVVVVVVVVVVVVVX6/qrqz//P/P////OAAP/MP//////////8AAAAAAAAP7+//z/z/wxVX//+vz/7/P8M1VVVVVVVVVVVVVVVVVfqqq6oP/zP8///PCgAP//////////////wAAAAAAAAAAAMM//P/AVVVV//wP9Pz8/9VVVVVVVVVVVVVVVVVW//6o/z//DzP//PzgAP//6mmu////////8AAAAAAAAAAAAAAAAPwFVVaX/8M1T88D/VVVVVVVVVVVVVVVVVVX///w/D/zz///z/AAC/+X////////////AAAAAAAAAAAAAAAAAABVVVVf1fNU8M+/1VVVVVVVVVVVVVVVVVVX+q/Aw///z//z/88Av//////qq//////wADwwAAAAAAAAAAAAAAVVVVVVVzFPzNb9VVVVVVVVVVVVVVVVVVV/qr/Dw/z8//z////H////rm////////8AAzwwAAAAAAAAAAAADKqlVVVVXAj8xVaVVVVVVVVVVVVVVVVVVVf/6//w/8/P/w////x////3wwwAP//wD/AAww8/DAAAAwAAAAP/yqqVVVVVfD/zVVVVVVVVVVVVVVVVVVVVVX/////wP/y/8////cr///9wAAAD/AAA/wAM8AAMPMMMAADDAD/86qpVVVVVP/MVVVVVVVVVVVVVVVVVVVVVVf/////A48fw///1XG//z/sAAAA/zoqP8AAwwAAAzzz88wAAA//OqqlqVVVU/81VVVVVVVVVVVVVVVVVVtVVX//////zPGzP//1VSsAAD7AAA8PwqKj/AAPMq/wMMMAAMzzAP/yqqqqqVVVzzFVVVVVVVVVVVVVVVVVvFVVVX////9TDxQ///1VYbz/o9wD/wD/Kir/zAMwKuoMw8wAAAPAD/86qqqqpVVU/xVVVVVVVVVVVVVVVVV7tVVVVb/1VlVP8zP2/VVXG8rqPsP/8w/zkqP8wDDCr6DPDMKv8AwA//OqqqqqVVVP8VVVVVVVVVVVVVVVVV7rVVVVVVVVVVf/z5VVVVVScK5j7AP/MPwpGj/AAMwu+sMPDCoqDzAP8/qqqqrlpVT/FVVVVVVVVVVVVVVVVq6FVVVVVVVVVVP/NVVVVVsbyqY9wP/8D/AAA//APDPioDDDAqKwMwD/8KqrquqqpX/NVVVVVVVVVVVVVVVVe65VVVVVVVVVVT/xVVVb+rG84PPsD//A/yom//AAMD8AA/DzKusMMA//yquqqqqqmPzVVVVVVVVVVVVVVVVXqxVVVVVVVVVVXPDVVVb+qxvP6j/A//MPwqGj/wDzwqqsAzww87DMMPz8/6qqqqqqz/1VVVVVVVVVVVVVVVWr1VVVVVVVVVVVj8VVVX6usrymY+wP/zD/KSo//ADDKuoPDDwqOAPAD/zP/qqr+qqv/NVVVVVVVVVVVVVVVVrVVVVWpVVVVVVU/FVVW+qrFwqqP8A//A/yoq//wDwyoqAMwwKioDMA//z//+q/6qo/yVVVVVVVVVVVVVVVVXVVVVWpVVVVVVVPyVVf+q/yvK6j/D//w/8qKj/wMDwq6gPDwyrqDDMPP8///6/+qqP8lVVVVVVVVVVVVVVVVVVVVWqVVVVVVVT8lVf/rvwbyvo/wP//D8Kio//DPDKvoDMw8qKwzDD/zP/////+6j/NVVVVVVVVVVVVVVVVVVVVVpVVVVVVVU/FVbqr//Gwq6P8D//A/yoqP/wDwyoqDDMwKisDwA/P///////+o//b5VVVVVVVVVVVVVVVVVVVVVVb/VVVVPzX/67//yvKuj/DP88P8qKj/8PDwq6gzDMCoqAzwP/8///////rP83/1VVVVVVVVVVVVVVVVVVVVVf//V/9T/P/+///wbyss/wz/8P8AAA//DwwAw4A/DwqKg8MADDz///////z/D//VVVVVVVVVVVVVVVVVVVVVf6q+//8/z6q/7//GAAAD8D//D8AAAD+//wAAAAwzDDzwA8w6rM//+////w/8//1VVVVVVVVVVVVVVVVVVVVX6mr6q/P86rrr/+ysAAD/A//8Pwzzz6qq/wAAADDwAAAA886qsP//uz//8//P/9VVVVVVVVVVVVVVVVVVVVb6aqqqvz/Kr/7/6oX////wP/zD////+qqvwwAAA8zwAAAA6qqqD//+////P8z//VVVVVVVVVVVVVVVVVVVVf+qqqq/8/zr///6vH////8P/8w////+qqq/8888wwwwAAP6qq/sD//wz//z/8///VVVVVVVVVVVVVVVVVVVfqWq/6v8/86///+vBv////A//w/////qqqv/wwwAAAM88w+v//+oP/////w//P//1VVVVVVVVVVVVVVVVVVX6qq////P/+r//qr8r////wP8PD///+6qqr6/MMMMAAAADqv///qj/////8/88//9VVVVVVVVVVVVVVVVVVV6qq////z/M///qr/H////8PP/A///qqqqqqvzwAAAwMMP6v////4P////8///P//VVVVVVVVVVVVVVVVVVVfqqvr//8//P//q//B/////A/Pw///6qqqqqr8DPDAAAAP+vq///+s/////P88w//1VVVVVVVVVVVVVVVVVVf6qrq/r/P/D//6r/8wAAAAPM/AAAP6qqqqqq/wAAAAAAP6vr////6Or//8Pz//P/9VVVVVVVVU01VVVVVVVf6qr////z8///qv//AAAAKrr4wAAOqqqqquqr/AAAAAAA6r//////jqqq//P888P/VVVVVVVV+//UVVVVVVX6qr////z//D/6///AAAAAAAAAAAOqqrqq6qq/wAAAAAAO///////8qqqqq/z8/z/1VVVVVVVf///VVVVVVb6r/r///8//8/////8AAAqrbaAAADv7/+uqvr//AAAAAAD////////K6qqqqq/8/D9VVVVVVV///wVVVVVVX6v/qv////8/6u/////vsAAAAAAAA7+//+v/7/8////////////8D/D//+qqqqq/w/VVVVVVVY///xVVVVVX6r6r////PPqqqvqqqqqrAAAAAOqqr///////////////////////D//////qqqqu/1VVVVVVVf//9VVVVVV+q6r/////qqqqqqqqqq8Pqqqqqqqr//zz////////////////////////////6qqq9VVVVVVVQz8+VVVVVVfq/7////qqqqqqqqqqvAqqqqqqqqqqqqq//////////////////////////////6qqVVVVVVVVXzPVVVVVVX+v////qqqqqqqqqqr8Oqqqqqqqqqqqqqqqr///////r///////////P/////////qlVVVVVVVVdRVVVVVVf6v///qqqqqaWWmqqvw6vqq6uqqqqqqaaaapqqv//////////////8//P/////////9VVVVVVVVVVVVVVVVX6///qqqqqaaaqqqqvwqqqquqqqqqqqqqppaZaqr//////////////zq///////////VVVVVVVVVVVVVVVVW+v/6qqqpppqaqqqqrAqqqq7qqqqqqqqqqmqaqqqquv//////6////8iv8/////////1VVVVVVVVVVVVVVVVvr+qqqaWmmqqqqqqrwKqzqqOqqqqqqqqqaqqqqqqqqqq//////////K+rP////////9VVVVVVVVVVVVVVVVX6qqqlpaaaqqqqqqqgOqqqqj+qqqqqqqqqqqqqqqqqqqqq/////////q6r/////////VVVVVVVVVVVVVVVVW6qqmamqqqqqqqqq6qAqqqqqD/66qqqqqqqqqqqqqqqqqqqr///////7qoP////////1VVVVVVVVVVVVVVVaqqaalpqqqqqqqqrqqrKqqqqoD//rqqqqqqqqqqqquqqqqqqqv/////y6qv////////9VVVVVVVVVVVVVVVqppppmmqqqqqqquqqqqr6qqqqsA//+qqqqqqqqqq6qrr//+66qq/////DiqP////////VVVVVVVVVVVVVVWqmlmaaqqqqqqqqqq6rqqqqqqqqsAD/+qqqqqqqqrqrv//////qqqv////8M/////////1VVVVVVVVVVVVVaqaappaWqqqqqqqqqqqqqqqqqqqqrAA/+qqqqqqqqq///+uqqqqqu////////////////9VVVVVVVVVVVVVqmmmlqqaWaaaaaaaqqqqqqq6qqPqqqsAP6qqqqqqur+qqqqqquv///r7//////////////VVVVVVVVVVVVWqaaaapZmmlmmmqaqqqqqqqqququr+qqrA/qqqqqq6qqqqqv////qqqqqqqqq//////////1VVVVVVVVVVVqqmmqppqaWmqaqqqqqqqqqurq+qqqvqqqrA6rqqqqqqqq/////+qqqqqqqqqqqqr///////9VVVVVVVVVVWqpaqqqaqpqmpqqqqqqqqqqqqr/q6qqqqqqqCqqur6+6r////+qqqqqqqqqqqqqqqqq//////VVVVVVVVVVWqaqqqpqqqaaqqqqqqqqqqqqq/8OqqqqwADqvqqq7676/////qqqqqqqqqqqqqqqqqqqq////1VVVVVVVVVaqmqqqmqqqqqqqqqqqqqqqqrv/8Dqquqv/+rqqq+u+//////qqqqqqqqqqqqqqqqqqquvu///9VVVVVVVVWqqaqqqppqqqqqqqqqqquqq7///AOqrqqqqqqKqqr//////+qqqqqqqqqqqqqqqqqv/////////VVVVVVVVWqqqqqqmmqqqqqqqqqrrqu////wDqqq+qqqqq+qqq/////+qqaqqqqqqqq6rququqqv////////1VVVVVVVaqqqqqqaqqqqqqqqrqqqr////8D6qqqwOqqqqqqqr/////qaWqqqqqqqqqqqqrq6qqqqv//////9VVVVVVVqqqqqqqqqqqqqqqqu76r////AA6qqqqqqv6qqqqquv///qmmqqqqqqqqqqqqqqvrqqqqqq//////VVVVVVaqqqqvqqqqqqq6rquvu6///8AAOqqqqqqqgOqqqqq7///qaaaqqqqqq6qqrqqqqr+6qq6666r////1VVVVVqqqqq76qqqqqquqqq6////8AAD6qqqqqqqqqqqqqqv//qaaZqqqqqqqqqqqqqqq+vvrrr/u+qq///9VVVVWqqqqqvqqqqqqqrq6rr////AADqqqqqqqqqqqquqqr//6ppmmmqqqqqqqqqqqquqq+/76q//+u/////VVVVqqqqqqqqqqqqqqqu6qr///AAD6qqrzqqqrqrqqqrrr/6ppqaaaqqqqqqqqq6qq6q6v/////////////1VVWqqqq6rq+qqqqqur7uq///wAA+qqqqrqqquqqqqqqq/+qaaZppplqqqqqqquqqrqv///////////////9VVaqqqqqqv+qqqqqquv/r//8AAPqqqqqqqqq6qqqqqu//6lpaaaaaapqqqqqrqqq6//////////////////VWqqqqqqv/+qqqqq6v6/r//AAA6qqqqqqqq6qqqqqr7/+qamqaaaaaqqqqqqqqqqv//////////////////w==");

function getStatus() {
  var payload = JSON.stringify({
    template: config.template
  });
  var date = new Date();
  return (new Promise((resolve,reject) => {
    var options = Object.assign({
      path: `/api/template`,
      method: 'POST',
    }, REQUEST_OPTIONS);
    options.headers["Content-Length"] = payload.length;
    var timeout = setTimeout(function() {
      reject("HTTP Timeout");
    }, 30000);
    var req = require("http").request(options, function(res) {
      console.log("POST open",res);
      date = new Date(res.headers.Date);
      var data = "";
      res.on('data', d => data+=d);
      res.on('close', function() {
        clearTimeout(timeout);
        resolve(data);
      });
    });
    //req.on('error', reject);
    req.end(payload);
  })).then(data => {
    console.log("POST complete", data);
    try {
      json = JSON.parse(data);
    } catch (e) {
      Badge.showError(e);
      return;
    }
    return Badge.showRendering(function(g) {
      g.setColor(0).setBgColor(1).clear();
      function drawTxt(value, label, x, y) {
        g.setFont("Vector:100").setFontAlign(0,0);
        g.drawString(value, x, y);
        g.setFont("28").setFontAlign(0,0);
        g.drawString(label, x, y+60);
      }
      g.drawImage(image, 800-250, 480-184);
      drawTxt(json.pv, "PV (W)", 200, 170);
      drawTxt(json.grid, "Grid (W)", 500, 170);
      drawTxt(json.battery, "Battery (W) - "+json.soc+"%", 200, 320);
      drawTxt(json.load, "Load (W)", 500, 320);
      g.setFont("28:2").setFontAlign(0,0);
      g.drawString("Solar Power", 350, 60);
      g.setFont("22").setFontAlign(0,0);
      g.drawString("Last Updated: "+date.toString().slice(0,-12), 310, 460);
      // battery
      let x = 660, y = 40, w = 100, h = 250, b=8;
      g.fillRect(x,y,x+w,y+b);
      g.fillRect(x,y+h-b,x+w,y+h);
      g.fillRect(x,y+h-b,x+b,y+b);
      g.fillRect(x+w-b,y+h-b,x+w,y+b);
      g.fillRect(x+w/2-20,y-20,x+w/2+20,y);
      y += h-b*2; h -= b*4;
      g.setColor(3);
      g.fillRect(x+b*2,y-(h*json.soc/100),x+w-(b*2),y);
    });
  });
}

Badge.connectWiFi().then(getStatus).then(() => {
  // wake in 15 mins
  ESP32.deepSleep(15*60*1000000);
}).catch(e=>{
  console.log("Error",e);
  Badge.showError(e).then(() => {
    ESP32.deepSleep(5*60*1000000); // try again in 5 mins
  });
});
