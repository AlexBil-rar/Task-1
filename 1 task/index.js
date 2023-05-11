const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

const createTimerAnimator = () => {
  return (seconds) => {
    let sec = seconds.slice(4, 6)
    let min =  seconds.slice(2, 4)
    let hours = seconds.slice(0, 2)
    timerEl.innerHTML =`${hours}:${min}:${sec}`
    let interval = setInterval(() => {
        if(hours == 0 && min == 0 && sec == 0) {
          return timerEl.innerHTML = `00:00:00`
        }

        if(sec < 1 && min >= 1) {
          sec = 60
          min --
        } else if(sec < 1 && min < 1 && hours < 1){
          sec = 60
          min = 59
        } else if (min < 1 && sec < 1  && hours > 0) {
          sec = 60
          min = 59
          hours --
        }
        sec--
        return timerEl.innerHTML = `${hours.toString().replace(/^(\d)$/, "0$1")}:${min.toString().replace(/^(\d)$/, "0$1")}:${sec.toString().replace(/^(\d)$/, "0$1")}`
      }, 1000)

      setTimeout(() => {
        buttonEl.onclick = function() {
          if(inputEl.value.length > 5) {
            clearInterval(interval) 
          }

          console.log(inputEl.value.length)
        }
      }, 10)
  };
};

const animateTimer = createTimerAnimator();

inputEl.oninput = function() {
  if (inputEl.value.length > 7) {
    return inputEl.value = ""
  }
  this.value = inputEl.value.replace(/\D/g, "");
  const total = inputEl.value
  if(inputEl.value.length > 5){ 
    let sec = total % 100; sec = Math.trunc(sec)
    let min = (total / 100) % 100; min = Math.trunc(min)
    let hours = (total / 10000) ; hours = Math.trunc(hours)
    
    if(sec > 59) {
      sec = 59
    } else if (sec < 10) {
      sec = "0" + sec
    }

    if(min > 59) {
      min = 59
    } else if (min < 10) {
      min = "0" + min
    }

    if(hours < 10) {
      hours = "0" + hours
    } 
    return this.value = `${hours}:${min}:${sec}`
  }
}

buttonEl.addEventListener('click', () => {
  if(inputEl.value.length > 5) {
    const seconds = inputEl.value.replace(/:/g, '')
    timerEl.innerHTML = seconds.slice(0, 2) + ":" + seconds.slice(2, 4) + ":" + seconds.slice(4, 6)
    animateTimer(seconds)
  }
  setTimeout(() => {
    inputEl.value = '';
  }, 10);
});
