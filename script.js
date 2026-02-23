(function () {
  var progressBlock = document.getElementById("progressBlock");
  var progressArc = document.getElementById("progressArc");
  var progressValueText = document.getElementById("progressValueText");

  var valueInput = document.getElementById("valueInput");
  var animateToggle = document.getElementById("animateToggle");
  var hideToggle = document.getElementById("hideToggle");

  var radius = 40;
  var circumference = 2 * Math.PI * radius;

  progressArc.style.strokeDasharray = String(circumference);

  function clamp(value, min, max) {
	return Math.min(Math.max(value, min), max);
  }

  function setValue(v) {
	var value = clamp(v, 0, 100);
	var offset = circumference * (1 - value / 100);
	progressArc.style.strokeDashoffset = String(offset);
	progressValueText.textContent = value;
	valueInput.value = value;
  }

  function setAnimated(isAnimated) {
	if (isAnimated) {
	  progressBlock.classList.add("progress-animated");
	} else {
	  progressBlock.classList.remove("progress-animated");
	}
  }

  function setHidden(isHidden) {
	if (isHidden) {
	  progressBlock.classList.add("progress-hidden");
	} else {
	  progressBlock.classList.remove("progress-hidden");
	}
  }

  setValue(parseInt(valueInput.value, 10) || 0);
  setAnimated(animateToggle.checked);
  setHidden(hideToggle.checked);

  valueInput.addEventListener("input", function (e) {
	var v = parseInt(e.target.value, 10);
	if (isNaN(v)) v = 0;
	setValue(v);
  });

  animateToggle.addEventListener("change", function (e) {
	setAnimated(e.target.checked);
  });

  hideToggle.addEventListener("change", function (e) {
	setHidden(e.target.checked);
  });

  window.ProgressBlock = {
	setValue: setValue,
	setAnimated: setAnimated,
	setHidden: setHidden,
  };
})();