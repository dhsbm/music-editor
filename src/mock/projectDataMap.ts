// 项目假数据
const project1 =
  'eJyrViooys9KTS7xTFGyMtCB8UIyS3JSlayUXu6e8WLdkpcLdz6fvU5JRykzr6QoP6U0GSQF5CaWlmTkF4F0KhkYGAIFkgpylawMjYDmlBQlJmdDzQSzfRMLlKyqa4E2JJaUpBblweyD8OCyefklqS6JJYlQaRgXLp+aV5aak1+QCpWHceHyKfklSNqhPKhsLQBNYVI4'
const project2 =
  'eJzFVUtvEzEQ/i/muoq8trOvW0UVqVI5wQGpymFJXBpI42jXKUTRHjkBJ8SpSAghIU5QhJB4iJ8T0v4L7K2968emak+9RJnxfPPNN54dr8C8YE/oiO+NQQZCEGj7wYRPqXD9+/Hy/Ovbiw+/NqdfxOlkxgs2Xow6jvIFP2JFnQdCmenR/BhkIYIB4EU+eipPsPp/L5+DbCX4xE9zGAZgxKasEAnu7A7icBABFa6LuXj//fzvZ5n7hE0Xx7TGlGxRyHpEpuVcRpWTGZX1cF5DZRjsoQCM6ShfaltUUtApzUtqRJSLkueT2T49oVPpiivRD5GHFrO98X3KQXYQBmgYADoTEWxOtddy7U9KHSnwyNKIDI2DwV3UJ90a0W1q7BDoylYapUBsCcSGwB0c7wz63QLxbQrEAbnmJQ4rEw0y0ljbRtgIFtaMcbqb81yZorJCpIWS6TIbOzwsKX9Y+4x+qCxmz86+hcCbJ5sQbSMkijAxCMk1Cb37NQixTYg8hehmCpEkJFcQEpsQewqjmynEQF6wk1Kb5hU7fe3cCjJGYWJxTQcrULBnIIv9tsBe36itEtiYGADSAmRgDQldQGQAogYQ6nCfITEASQtoGJALSA1A2gCQDvcYkrAFJO3woYYBuwBsANq7xDrcZzC6lLRdwg0DsQCV/l6cIXXXgXV3lZ55ZyocEHFAlbk9VJcuzc5Ngexw0a0x48aA5eIJNj7yqxeHzqRne/3xbHP6c/3qxebPO39nIK9Sgxpto96yQjzqN6/Xvz9p6srNrSyzJbbu8iiX+18+Izmnj1mxVDPtvEfDOpfa0ivwXA4yhDiFcQAEBFZB7US1FWqrl6YRTIkKaZ5nu0ZVAjRLgH4JyC8B9tIoifuhXUIPIphgbFWCTaespKr+A8ZsFM4='
const project3 =
  'eJy9lb+O1DAQxt/FtNHKHmdj75aIQzrpqKBAQleEXZ9Y2ItXiXPotMoTUFNRIDoq/ghRXMHrwPEW2NmsPUl8ylU0q/X458/f2DPOnuxK/VqtzOmaLMk8E5Ikx9CzjdkqG/376ebPhy/MTmwKU+p1vXLR3z/f3X59f5izU3ltXumyVaHUsS93l2TJgCbElPnqjZuB7v+TfEeWe8Lcj59kCVnprS6twIPH84xmJ6TDvY+PP25/fXbaV3pbX9oQnYHVrHRdOktW7HrnwGpTKGfJmHZ1RyZkrVb59XHME1KqrcorhYiqrky+Kc7Uldq6kGjsaVgdVRan66fKkOULlsB5QlRhCb1Tx2gvdLap2phdDL0cAeUoFycPQcZzBJQjm7H/neK988NL2+y60V0XjGA7KrRRj3KTd0Nrq7SyqdvJRmRC9MVFpczzNuaPw6vgI/v2nYwOmw3N4f3A70e7/VK0H73Pfs1I8TjE6Q+SHBbT+WFVt4JnNrYnpX5LljwLFmdi3rlkyFmTjFEWUJhAIaB8AuUBxVfRWPdcIssS+fCO27UReYmceM/TMPUwnYa5h/kAttZTGqynFFmH4D26AYIhwDAJ0wDTSZgHmM9G1gFZD7XMvG+IywcUvOtJlHrPkyj3jvto+1TAsB9g1A/Q7weB+kFkEe9RP4ik8eO2uwiBpEX8iuLlheje7Y/qS6DWELFqj7adiJU6G0ovkPQi2tJ3XBai8bMyvK+ESNQdkkZuOCqPSBZvIifNkDSLN1787BHd64/R2UvUIBIiz1L0dURkeDnSQSE3+FPYldhheKhaO7/W5ljj1I+62eYf8nrnFQ=='
const project4 =
  'eJy9lL1u1EAQx99laa1od9ZOfNeCIkUKFRRIKIWxN8LgeC17HRSd/ATUVBSIjooPIQqKvA6Et2D8tTtnO/LR0JxuZn4785/ZWe9YUepXKjZnCduykxAk80bX09RkCr1/Pv78/f4zYCDNTamTOm69v368vfvyro9hKKrNS112WTgX6HhRXLGtAO4xU0bx6zYCw//HUcG2OybaHxsUHot1pktM8OD09CEEPhtwq+PD97vbT23ua53VV+jiRyeBxypdl60kTHZTtGCV5qqVZEx3uiexeKLi6Ga0pcdKlamoUoSo6spEaX6urlXWpW9wGphHlflZ8kQZtn0uPLjwmMqR0IUavXuu87TqfHgY9nqEA3sE0qP43w0e3B092vU2WPddL4HRyrVRjyITDSbKKjEtbyuhx/eYvryslHnW+cgwhix0YF+/sdmoxVQcrQe2nj/UC0k9/5B6zSzjaNL2J01OV+miPzWckMfo27FSv2FbeexG0i15p1IQZY03R4VDYQUFh8oVVDqUjqZB9TIkkkOiwyruzi6kD4kSq3kd5hbm67C0sJzAKN3nTrrPiXRw2hcLEBgcDKswdzBfhaWD5dFMOhDpbpeF1Q3L6R0KVvUqyq3mVVRaxfto96mA6XuA2XuA/fcQBK7NIPiHfSHw+iYS+P7lQmHBhqjZLL0jfzH9ZmHoy0I2Cze5RvLljcKJN/SbPYC92Y8X44k242Vwaw3R5i/VEYVy'
const project5 =
  'eJy9VD2P1DAQ/S+mjVaxs0m82wEL0klHBQUSuiIkPhHIxZHjHDqt8guoqSgQHRUfOlFQ8Hfg+BeM8+HM5kO7Fc1q/ebNezPjcfakUPK1iPVZQrYkXPsBcXroWaozAejfTz//fPjiQSDNtZJJFRv09493d1/ftzEIRZV+JVWj4roUgJfFFdlS5jpEqyh+YyKs+/8kKsh2T6j5sUHqkFhmUoHAvcf3Nw8DI9JEbR0fb+9+fTbwtcyqK4Dcle85pJSVMiWB2E1hiGWaC1OS1k12ywTzRMTRTX+GRCUyEZUCMcqq1FGan4trkRkorGEaoCNUfpY8FZpsX1CHXThE5MCQhejRA+g8LRsMktlBjwz1SIMHu92j+R4Z6pH+7wZP7g6nNr11p6XrRWQ45VKLXaSj7ghlKZB1jRMga4fIy8tS6OcNhobRqeCBfftOJqOm4+KwH7N+686PI7/1KX71RLE/4vZHTY5X6aLN6jLCALA9UfIt2YaBLZF1JbKVjwqrnSmzH557yASXMETS4ZCwYr7NCeflBzYb2GzENhYcWXCU1Od4s/IcFdMz6Vh6g6Q3SDq02k1pM/IbJG/ZdMQGC+4OFty1SZ7Vn5VHTGq1J9IUSQ+bTodp0oXZI7Y3sL3p7DlDFgxZ2PualWdI3h8eHpKu+3c12vXRIrPDReZo23h4bETOlLmwyDPMI48DMReu0kwPbS7nJ0/v6ObOMI+8BsRcvpEaf4y7WbXHdvwQT6TuL8u1py5a/wNTpHrz'
const project6 =
  'eJy9lL+O1DAQxt/FtNbKdhKS3fK0V5x0VFAgoStC4hOBXBw5zqHTKk9ATUWB6Kj4I0RBwevA8RaMEyeZZHPkKppV5pufZ74ZW3sgpVYvZWLOUrIjoed7hPbSk8zkEtQ/H378fvfJh0RWGK3SOrHqr+9vbj+/7XKQimvzQum2CmMchOflFdlxwSgxOk5e2Yxw34/ikuwOhNufIckpSVSuNBR4wB+e7PenxOGDj/ffbn9+tLWvVV5fgcQ3XkhJpWptLUGxm9KCVVZIa8mY9rQl2QaapzKJb/rYo0TLXMaVRERVVybOinN5LXMrhQ1sA+pIXZylj6Uhu2ecigtKZAGEKmWvTqTzrGo1OCwmMwo0Y7Q9PRHR8owCz/i/B7z3dPhoO5uL7rpeBENUKCP3sYldCLY0lGW2Eyg+JeryspLmaauhZbgqeGFfvpKjVfO5OdxPDP181y9C/fz79GuOKvYhHn825PwpXXSn3IkoBO1AtHoNfsLBIncW+SZAxhp6TPbLY6ukcKRYJT1HelMSnEcRshuNdi3YFV8sPZJsIPkKKQbSWyG9gfQndpv+gcwubXYjYnojQTCOGAQLdsQmXFwggsd98HV4XAmbwWAs2CI3W+QmXJyZLqD/vnZErjw6RN7x6GDjDf7XcGAXduuFfKpMfxlsiFy2+QtBDRmN'
// 这个是4条
const project7 =
  'eJzFlr9v00AUx/+XY7Wq++Wck61qFalSmWBAQgwmuYpAGkf2paiqMiEmZiYGxNaJH0IMDPw5QPtfcOfYvnf2S52KCpaq9+7jd99378flgizz7LmemKMpGREZ0yGJatPDmZlra/35+vL61eX1h++/3320u7OFybPpauK2fn17c/XpbbOVrsyzLC9dUcqs4enylIwYpxExeTp54XZk9f/9dElGF4S5P80mi8gkm2e5dXDvcKzYeEAqvBZz/f7r1Y9L5/ssm69OrYntCRWRIlvlTpJ1dr50YDFbaCfJmPJrR9I9HpGpnqTn9VpEJNdznRYaEMWqMOlscazP9NyZ1NpeifWj88XR9IE2ZPSYPYmIXtj9bKlrW2A6nhWlzX7Kgwg5iHA8PuCxxCPkIEIrIf7XEfJbRCiCCAWIcF+o/XGMRyj+c4TiFhHKIEIJc7g/PBgwPEIZRBiLfx2h3DlC+G0ZX7Xa1qQAtqtFZvRhatJqaXXl1i11J228ZScnhTaPSlvTto0XeGmfvxCsZcB5PDyP38V5nQIG54nwPHEX53XKKbx8eJ78+/PWHY/1Eqa3lURk4Dmi+iJR1nZB8uwlGSWqkcgqiWwvBsLWUZesg6G9JK9I3kuKihQhaZUnCZCbeLkO3DhHXXuSNiTrIXlDih5SNKQM5K7rBmiVOTKgQUbEwIcoBkC4ulE5QJlH0esAKPcoGiVAhUdlKysCZEVgWdkoQtxj1837YZ9F2g/79IgWbKVL6qVLCqTz+OYWADD38JbaBjD18JaWAbDwcLcXJAfSOdK6HHfPkY7sRX2b96K+e0O07AfR7geBPuegH+LYhxnHt6gXAPdXIoC3F5cVFg+BmiHWRxJ1P9x1DAKyZwgDcssQLm9ctm9coj8vwI0rMIHUYFfhgNwmJyIKPDdK4U2BJwjQQb91MqTAMFI7j3PV+0Q41yD5Ck1+u+ajLg0HebtD7AMH5lFCkZ7C307aVzTONQOuGT7q8LsHdDCROnefgJGUcKT98OeZI7O6/ZSu4c/dqsQ2y03V2v1pZuoap82q2l3/AWYirhs='

const projectDataMap: Map<number, string> = new Map()

projectDataMap.set(0, project1)
projectDataMap.set(1, project2)
projectDataMap.set(5678, project3)
projectDataMap.set(7823, project4)
projectDataMap.set(7456, project5)
projectDataMap.set(7343, project6)
projectDataMap.set(4509, project7)

export default projectDataMap
