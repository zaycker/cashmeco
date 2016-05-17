import { h, Component, render } from 'preact';

const shadowUrl = 'data:image/svg+xml,%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fww' +
'w.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F199' +
'9%2Fxlink%22%20height%3D%22100%25%22%20viewBox%3D%220%200%2076%20105%22%3E%' +
'0A%20%20%3Cdefs%3E%0A%20%20%20%20%3Cstyle%3E%0A%20%20%20%20%20%20.shadow%20' +
'%7B%0A%20%20%20%20%20%20%20%20fill-rule%3A%20evenodd%3B%0A%20%20%20%20%20%2' +
'0%20%20opacity%3A%200.75%3B%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%3C%2Fsty' +
'le%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Cpath%20id%3D%22shadow%22%20class%3D%' +
'22shadow%22%20d%3D%22M185.748%2C725.157c16.062%2C0%2C26.134%2C10.521%2C22.5' +
'%2C23.5S161.92%2C806%2C161.92%2C806s-15.483-44.363-11.844-57.342S169.685%2C' +
'725.157%2C185.748%2C725.157Z%22%20transform%3D%22translate(-133%20-702)%22%' +
'3E%3C%2Fpath%3E%0A%3C%2Fsvg%3E%0A%0A';

const greenColor = [121, 191, 86];
const oneHundredthStep = [1.08, -1.04, -1.59];

const getColorFor = (pos) => {
  const r = Math.round(greenColor[0] + oneHundredthStep[0] * pos);
  const g = Math.round(greenColor[1] + oneHundredthStep[1] * pos);
  const b = Math.abs(Math.round(greenColor[2] + oneHundredthStep[2] * pos));

  return `rgb(${r},${g},${b})`;
};

const iconUrl = (props) => {
  const {
    point,
    data: {
      filters: {
        currency,
        operation
      }
    },
    range: {
      min,
      max,
      step
    },
    pointsAmount
  } = props;

  const rateFullNumber = point.rates[currency][operation];
  const colorPos = (operation === 'buy' ?
    (rateFullNumber - min) : (max - rateFullNumber)) / (step || 1);
  const color = getColorFor(colorPos);

  return `data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20height%3D%22100%25%22%20viewBox%3D%220%200%2062%20105%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3Cstyle%3E%0A%20%20%20%20%20%20%40font-face%20%7B%0A%20%20%20%20%20%20%20%20font-family%3A%20'Open%20Sans%20Condensed'%3B%0A%20%20%20%20%20%20%20%20font-style%3A%20normal%3B%0A%20%20%20%20%20%20%20%20font-weight%3A%20700%3B%0A%20%20%20%20%20%20%20%20src%3A%20local('Open%20Sans%20Condensed%20Bold')%2C%20local('OpenSans-CondensedBold')%2C%20url('data%3Aapplication%2Ffont-woff%3Bbase64%2Cd09GRk9UVE8AAAysAAsAAAAAFTgAAQALAAAAAAAAAAAAAAAAAAAAAAAAAABDRkYgAAABCAAACNoAAA9B0RzDLUZGVE0AAAnkAAAAHAAAABxoOW2%2FR0RFRgAACgAAAAAcAAAAHgAnABNPUy8yAAAKHAAAAF4AAABgon6fr2NtYXAAAAp8AAAAUgAAAVIQUxlKaGVhZAAACtAAAAAyAAAANgmWl3hoaGVhAAALBAAAAB4AAAAkDCUCVWhtdHgAAAskAAAAIgAAACIOPAHebWF4cAAAC0gAAAAGAAAABgANUABuYW1lAAALUAAAAUgAAAKd%2FjDDFHBvc3QAAAyYAAAAEwAAACD%2FAwBmeJxtV3t0FOUVvxuyySYmG14bRBYCojyWhyCIJbV1hHBASuGUdE4rFUIK1FIgAZFaStOzFQl4Ro%2BV0uOjtPEAVjpgpYA8qpCxogkWFChToCBIabVVC6Uqs8kEbu%2FvTnY39DR%2F3P3N993vvr77%2BBKi3FwKhUI9pi2eV1NZXbN02PjamrnzapbOmzuuduFcCuVQiCpSvSgVz0n17pTqnutXF3W6XJTbp5By1wwqs6wMKMrf5q9vTcTDh8NxeqEkTtQ5Tvu7xKlbvGR4V%2BoESWHqTSNGDh85Eur6Ql%2FfjL6%2BUPh%2F1kn%2BiqmEulBX6kbdKUal1INupJ50ExVDaC5NpUs5yZxTub3CH%2BeNzx9bcH%2FBsqLK6PSWH0evpMZ5C2J1G%2Fz1Vngp87dth%2FmsaTB%2FE%2Bg4yFTbiXhVeUzT5Yv2gJTbSaYG22C6GZ%2F1whG94nXyescs5kO28yzzCdd4sebFmp3Ml5P0usU02naEDnLlUNQ0NjPFbSegspAk2TINqzFgrJOvJNXKrmkElPnPypgQgw4KYyT4kWURyJdh59%2FAdQEki%2F4zhMQU0fyNSLTlWkut2Bcqxsb7tuOZzK8LpodwOoueAyoH01LR4PcRJc9h%2FQCWGkHW4DOLzoEY4F1v8bUU7OzjGn4l05ew8xjkZdE88ZUPgOkJ9UN%2FmL6TpLeY7hazCjM%2FZa6EuRHboYiEmK9eYqfU8mYxRRDGxxC1LrZzPE37YeEWkJEqc4SGvB9Un4bqrkC7oDqLCuDG98HIY5Qutp3VzOtcY2XFygqJIOJ7GGH%2FF86cN41IFjJ%2FgJ1%2Fa9bo6XeUnoUN%2FeHoRdM4lqZeAka7JDYdQsa0LCqNh3f59fltPf02b6hfHj5%2FgWmsazQz9badl9K0i%2Big7nAgFxbnQdsVkHoQH2asU7UbROrVi%2FnRloulXn3b0p%2FlMz2DE38AmQXyI40Q0BjIy6I%2B2BgNdCPI7dejrrDg9oTz9L6n9z3lWG%2BIByug9iyuYTbQPkiacD3a6AYF4hdakQnWZElT05jG%2FFfbCaisHLSdCczbUGFD%2FdHh3XpnTLdCaT9NpPRtZdDW4M6ov1zxDjGkb5LqNtVukjIpSlK1VWl9i7kFgTmK%2BH9qGrPS9BPTuJ%2F576YxIxL8zGDeievdo2kvRvjPtOVaflU42nI0nrtIioUWYus96DMh7vcw4stwLosagMqQB4%2FKLfgJuYiVOPUOyC%2FBISTilfiTwkwTTeOPTPeaxhamr2iSBqk6AOcvJ5xfS2RMI6BMxdB5POFYX7PuYf4ItjZDoAvRfwHJojc0R7Er4bQid%2FlVZ6Vn7YCY%2B2xnnD%2BgTAzbDs5PwNQE0SfxeQafWfQm0EUI265JdSSd10z52DoEVALOLDpiGs9XMd2EEK7JvzBT4%2FYQ00%2FUt6eUPpikHUyVtnM6TQcjPxboZr1WqnbfD1zjlFQcZI%2BF7Cza4xov3yY9ULQgtaUdb5RYDkFuDoObuI0OqNSWlP6qBO%2FDSLQ14TXFvGX%2BoNYx%2Fu78tqnXyi1%2FSWqJZflN3jrL8prC%2FjpvWcx%2F3PIqUsVyT720CUJ1T6B7gHoATYJ261G%2FtN6Ph6OpNa0DY8zvihOzV%2BtFrIw0eEdSvUTm6qu51qyrSy5MDh9kimXkFYLcGbQ%2BC6sT4PV2ODgX6D51FWQrPqUdlc3EBcDNAlza26bxqzQ9jtWYa8yXakXw10pcpuHsu5D8AAR8KL20u%2BXdIvFdjCIfahpnmGS8BVQnjddZdhv0Jlbh9LkkfTaZaQpqFJR5M44OMA0%2Fx4pE3ZYQBt1QnO6HpEQLoPFS6ZT5mZNwTKZH9F5XqORqsA9LOH9immEaAX2Z6YdJNESpPssbJKMLTEsg8yBkTrOdjmgHdge6xmDMv7fliNTzZTCf0IkHljRaIKMRSfwPLDZLbJJSDWHT8IqCnKWZifTljgNJo21SkchL7UP9zOuQplVn2zkhBg9Vz5Bt3Go7e5k%2FR5Evy9dp8CTzP8HbyTUWCbWdDA3JiuVPl%2Bg9CMNehYkbdQRpx8ygo9iVpmD5%2ByOpW9tGxPQBIMfOwbieriHVNUprbBQ4P8P1TNZIVkuwJeGKoH%2BUtnG9ZJA02tI%2BTgYK6260UITwI00lffVgL4sKsXsAsnmnxDGYM9JTsfwqbJUMq0pTMW%2FZHEkRb1Kp95KVGhjPbbO8KVc3SaWtSq21pGJq4%2BGD4o02BX4BCX0OQdgLmfshLovOQMVm1bxWnd8Le6JYdeBwb3A2waksGgmJzYn0DGrGxiumIUOhGeeaQLTPNWY6XmOm473iGtad8PARiOqP9QYomgi216A8i4KnYsLxukoElwcZnpmp9wL9D9GN2cr4sFLp%2F8vFzCQ9oC%2BegEoj11SDOTZO3CUxPyHTF%2FgOXP4dcK5Mu4h9HSpxg4MiukKzs9Y05l%2BYyGTYTkAl4JSU%2B%2F560s9DCdVwkv095GDS3QURN%2BjId7V7OjsDurX9TTVEhlbk2bqwdq%2F2DiODejZTN3xjCHVABdB2UvyslnC%2BiWVNmKPtCRMM1Q7oNBy%2B2D435cgxpe%2FB1y5pTn1td0CfumLWcHW1HO9DepKM1oLYqe3aHJh%2FbhplliSl5xpzmS%2FZzvw0PS8ts2r%2BTL2UhSpthYQlTVdqq9PS0Aoq0LaDGMA%2F6pX2NED6gi926XeS9i2plsMxy%2Ftuu%2BUb9KUAzsWwJ4t%2BgRB%2FAbt1eDcXiavPIwDHMs1%2FE9iy6Iy%2BL8A7wvJvDuYT%2FxTyxmD7t%2FqQa0cngy5Ic4Iho89aug32oHRoYLpgOiB9%2Fg3WDoCT8i9IZF3eKr9c%2FlGA4npoewtEHxBZtAXVdkpt0fs6qdTVxwJWjwFhYPvLZTINxpL0yUbtmZKr4A79QO17zSQO9bSTFueMwhv72iIyOLSZjJi2LEsvRjq7297RgmrPoiKNnPaK34jflXU6Mmu1hwX0e9rj5mlCvo8jMRj%2FsWnsStPPsfpFF7U5RTsdzUQ0boDOCqAeYBhyPSpDEsa20A65%2FtZJ3VPTYw83SIt7Is8qKny8KPpfx1BnCAAAAAAAAQAAAADSASbaAAAAAMsGeM8AAAAAyzHOFXicY2BkYGDgAWIxIGZiYARCHiBmAfMYAAQiADt4nGNgZi5i2sPAzMDBOovVmIGBUR5CM19kSGP8xcHExM3BxszKwsTE8oCB6b0Dg0I0AwODBhAzGDoGOwMpHQZLNvl%2FIgwtHL1MEQoMjPNBcixRrNsYFICQEQC4QQ5jAAB4nGNgYGBmgGAZBkYGEPAB8hjBfBYGAyDNAYRMQFqHQY%2FB8v9%2FKMvg%2F%2F%2F%2FV%2F9f%2BX8ZqgsMGNkYkLkEASPQYGYWVjZ2Dk4ubh4SNA5iAADhPwu%2FAAB4nGNgZGBgYJTRtLPffSye3%2BYrAzcHAwhcjpM4BqdV%2F%2F1knsZ6FsjlYGACiQIAP8MLpwAAeJxjYGRg4Oj9u4KBgQWIGRiYpzEwMqACFgBfSwOGAAAEqAAAAikAMwIpAG8DtABJAGIAPQA%2FACUAWgBKAFAARwBDAAAAAFAAAA0AAHiclY7NSsNAFIXPtGlRkG4E6cLFgCAqJmm6LG7aEKFY2kVF1yEd2kKYhEwhD%2BJ7uPUFfJm%2BhSfp2CJU0Fxm5sv9OecC6OAdAtUncI4byw04eLTcxBXeLDvoYmu5hTNxabmNC%2FFquYM78ckp4Zwyc10rVNzACR4sN6n%2BZNlBDx%2BWW%2BiKhuU27sWt5Q6ehcYMORQ0JOaI%2BRpSiIy0qPOG9wKY5UrLeayNDDO9UNooJkfsS6vqKEt5D9mc1EPVaEEhl%2BdvBvIgNjSJokUhXXnEVe68%2Fq36u9RLvazBuh6XCODxBCyowqwzLQMvCA6O337uEb8fbpWZuzfbea2wYeQYwGeUdXgUzHkSVhX%2FMm6zZDXlRsle3DAzwZimEaZcIuICfXb3KLrZ5APfL8vSi%2FM4WSkvK5Z%2Buk4qY%2BNPxmE0nUdu3%2BvhC0LUd6t4nGNgZgCD%2FwwMaQxYAAAgwwFpAA%3D%3D')%20format('woff')%3B%0A%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20.marker%20%7B%0A%20%20%20%20%20%20%20%20fill-opacity%3A%201%3B%0A%20%20%20%20%20%20%20%20fill-rule%3A%20evenodd%3B%0A%20%20%20%20%20%20%20%20stroke-linejoin%3A%20round%3B%0A%20%20%20%20%20%20%20%20stroke-width%3A%202px%3B%0A%20%20%20%20%20%20%20%20stroke%3A%20url(%23linear-gradient)%3B%0A%20%20%20%20%20%20%20%20filter%3A%20url(%23filter)%3B%0A%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20.text%20%7B%0A%20%20%20%20%20%20%20%20fill%3A%20%23fff%3B%0A%20%20%20%20%20%20%20%20font-size%3A%2024px%3B%0A%20%20%20%20%20%20%20%20font-family%3A%20'Open%20Sans%20Condensed'%2C%20sans-serif%3B%0A%20%20%20%20%20%20%20%20font-weight%3A%20bold%3B%0A%20%20%20%20%20%20%20%20line-height%3A%204.36%3B%0A%20%20%20%20%20%20%20%20text-align%3A%20center%3B%0A%20%20%20%20%20%20%20%20transform%3A%20matrix(%201.16335433834222%2C0%2C0%2C1.16279069767442%2C0%2C0)%3B%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%3C%2Fstyle%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22linear-gradient%22%20x1%3D%22164%22%20y1%3D%22703%22%20x2%3D%22164%22%20y2%3D%22806%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23ddd%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23fff%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3Cfilter%20id%3D%22filter%22%20x%3D%22134%22%20y%3D%22703%22%20width%3D%2260%22%20height%3D%22103%22%20filterUnits%3D%22userSpaceOnUse%22%3E%0A%20%20%20%20%20%20%3CfeImage%20preserveAspectRatio%3D%22none%22%20x%3D%22134%22%20y%3D%22703%22%20width%3D%2260%22%20height%3D%22103%22%20result%3D%22image%22%20xlink%3Ahref%3D%22data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNjAiIGhlaWdodD0iMTAzIiB2aWV3Qm94PSIwIDAgNjAgMTAzIj4KICA8ZGVmcz4KICAgIDxzdHlsZT4KICAgICAgLmNscy0xIHsKICAgICAgICBmaWxsOiB1cmwoI2xpbmVhci1ncmFkaWVudCk7CiAgICAgIH0KICAgIDwvc3R5bGU%2BCiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImxpbmVhci1ncmFkaWVudCIgeDE9IjMwIiB5MT0iMTAzIiB4Mj0iMzAiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZDdkN2Q3Ii8%2BCiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmZiIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM%2BCiAgPHJlY3QgY2xhc3M9ImNscy0xIiB3aWR0aD0iNjAiIGhlaWdodD0iMTAzIi8%2BCjwvc3ZnPgo%3D%22%2F%3E%0A%20%20%20%20%20%20%3CfeComposite%20result%3D%22composite%22%20operator%3D%22in%22%20in2%3D%22SourceGraphic%22%2F%3E%0A%20%20%20%20%20%20%3CfeBlend%20result%3D%22blend%22%20in2%3D%22SourceGraphic%22%2F%3E%0A%20%20%20%20%20%20%3CfeFlood%20result%3D%22flood%22%20flood-color%3D%22${color}%22%2F%3E%0A%20%20%20%20%20%20%3CfeComposite%20result%3D%22composite-2%22%20operator%3D%22in%22%20in2%3D%22SourceGraphic%22%2F%3E%0A%20%20%20%20%20%20%3CfeBlend%20result%3D%22blend-2%22%20mode%3D%22multiply%22%20in2%3D%22blend%22%2F%3E%0A%20%20%20%20%3C%2Ffilter%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Cg%20transform%3D%22translate(-133%20-702)%22%20style%3D%22filter%3A%20url(%23filter)%22%3E%0A%20%20%20%20%3Cpath%20id%3D%22marker%22%20class%3D%22marker%22%20d%3D%22M164.006%2C703a29.974%2C29.974%2C0%2C0%2C1%2C30.006%2C29.942c0%2C16.536-31.206%2C73.058-31.206%2C73.058S134%2C749.478%2C134%2C732.942A29.974%2C29.974%2C0%2C0%2C1%2C164.006%2C703Z%22%20style%3D%22stroke%3A%20inherit%3B%20filter%3A%20none%3B%20fill%3A%20inherit%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Cuse%20transform%3D%22translate(-133%20-702)%22%20xlink%3Ahref%3D%22%23marker%22%20style%3D%22stroke%3A%20url(%23linear-gradient)%3B%20filter%3A%20none%3B%20fill%3A%20none%22%2F%3E%0A%20%20%3Ctext%20x%3D%2230%22%20y%3D%2240%22%3E%0A%20%20%20%20%3Ctspan%20class%3D%22text%22%20text-anchor%3D%22middle%22%3E${rateFullNumber.toFixed(1)}%3C%2Ftspan%3E%0A%20%20%3C%2Ftext%3E%0A%3C%2Fsvg%3E`;
};

const getIcon = (props) => L.icon({
  ...iconDefaults,
  iconUrl: iconUrl(props)
});

const iconDefaults = {
  iconSize: [30.11, 51],
  iconAnchor: [15.58, 50],
  shadowUrl,
  shadowSize: [36.92, 51]
};

export default function(props) {
  const location = props.point.location;

  return L.marker(
    [location.latitude, location.longitude],
    { icon: getIcon(props) });
}
