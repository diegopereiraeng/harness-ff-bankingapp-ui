// The following are defined by environment variables passed to the docker container
/* 
const STABLE_ENDPOINT = ''
const CANARY_ENDPOINT = ''
const LOG_CONFIG_LABELS = {}
const METRIC_CONFIG_LABELS = {}
*/

const CONFIG_PATH = '/config';
const POST_HEADERS = {'Content-Type': 'application/json'};

let config = {};
let endpoint = STABLE_ENDPOINT;

function configEndpoint() {
  return endpoint + CONFIG_PATH;
}

function init() {
  refresh();
  setInterval(refresh, 5000);
}

function refresh() {
  const url = configEndpoint();

  fetch(url, {
    cache: 'no-store',
    mode: 'cors'
  }).then(processResponse)
      .then(updateElements)
      .catch(error => handleError(url, error)
  );
  var flag = config.darkTheme;
  console.log("Flag Dark Theme: "+flag);
  var color = "white";
  if (config.darkTheme){
    color = "black";
  }
  document.body.style.backgroundColor = color;

  var switchArea = document.getElementsByClassName( 'switch-area' );

  Array.prototype.forEach.call(switchArea, function(el) {
      el.style.backgroundColor = color
      console.log(el.tagName);
  });

  var playButton = document.getElementsByClassName( 'button play-pause' );
  Array.prototype.forEach.call(playButton, function(el) {
      el.style.backgroundColor = color
      console.log(el.tagName);
  });

  var statusLabel = document.getElementById( 'statusLabel' );
  Array.prototype.forEach.call(statusLabel, function(el) {
      el.style.backgroundColor = color
      console.log(el.tagName);
  });

  var sectionRow = document.getElementsByClassName( 'section-row' );
  Array.prototype.forEach.call(sectionRow, function(el) {
      el.style.backgroundColor = color
      console.log(el.tagName);
  });

  var logSection = document.getElementsByClassName( 'logSection' );
  Array.prototype.forEach.call(logSection, function(el) {
      el.style.backgroundColor = color
      console.log(el.tagName);
  });

  var metricSection = document.getElementsByClassName( 'metricSection' );
  Array.prototype.forEach.call(metricSection, function(el) {
      el.style.backgroundColor = color
      console.log(el.tagName);
  });

}

function switchCanary() {
  // isCanary has checked value before the switch happens, so use the opposite
  const isStable = isCanary.checked;
  if (isStable) {
    endpoint = STABLE_ENDPOINT;
    primaryLabel.style.color = '#1B73E7';
    canaryLabel.style.color = '#ccc';
    borderBox.style.borderColor = '#1B73E7';
  } else {
    endpoint = CANARY_ENDPOINT;
    primaryLabel.style.color = '#ccc';
    canaryLabel.style.color = '#DEA521';
    borderBox.style.borderColor = '#DEA521';
  }

  stopEditing();
  refresh();
}

function toggleRunning() {
  const url = configEndpoint() + (config.running ? '/stop' : '/start');
  fetch(url, {
    method: 'post',
    mode: 'cors',
    headers: POST_HEADERS
  }).then(processResponse)
      .then(updateElements)
      .catch(error => handleError(url, error));
}

function reset() {
  const url = configEndpoint() + '/reset';
  fetch(url, {
    method: 'post',
    mode: 'cors',
    headers: POST_HEADERS
  }).then(processResponse)
      .then(updateElements)
      .catch(error => handleError(url, error));
}

function edit() {
  editButton.style.display = 'none';
  cancelButton.style.display = 'inline-block';
  submitButton.style.display = 'inline-block';

  forEachConfigField(startEditingFunction, config);
}

function isEditing() {
  return editButton.style.display == 'none';
}

function stopEditing() {
  cancelButton.style.display = 'none';
  submitButton.style.display = 'none';
  editButton.style.display = 'inline-block';

  forEachConfigField(stopEditingFunction, config);
}

function submit() {
  const editingConfig = JSON.parse(JSON.stringify(config));

  forEachConfigField(submitFunction, editingConfig);

  const url = configEndpoint();
  fetch(url, {
    method: 'post',
    mode: 'cors',
    headers: POST_HEADERS,
    body: JSON.stringify(editingConfig)
  }).then(processResponse)
      .then(json => {
        updateElements(json);
        stopEditing();
      })
      .catch(error => handleError(url, error));
}

function processResponse(response) {
  if (!response.ok) {
    throw 'Error: ' + response.status + ' : ' + response.statusText;
  }
  
  return response.json();
}

function handleError(url, error) {
  errorElement.innerHTML = url + ' - ' + error;
  if (!isEditing()) {
    mainContent.style.display = 'none';
  }
}

function updateElements(json) {
  mainContent.style.display = 'block';
  errorElement.innerHTML = '';

  const configFields = [];
  const jsonFields = [];

  for (configField in config) {
    configFields.push(configField);
  }

  for (jsonField in json) {
    jsonFields.push(jsonField);
  }

  let initNeeded = false;

  if (configFields.length != jsonFields.length) {
    initNeeded = true;
  } else {
    for (let i = 0; i < configFields.length; i++) {
      if (configFields[i] != jsonFields[i]) {
        initNeeded = true;
      }
    }
  }

  config = json;

  if (config.running) {
    statusLabel.innerHTML = 'running';
    statusLabel.style.backgroundColor = '#d1efd7';
  } else {
    statusLabel.innerHTML = 'paused';
    statusLabel.style.backgroundColor = '#efefef';
  }
  if ((config.running && playpause.classList.contains('play')) || 
      (!config.running && playpause.classList.contains('pause'))) {
    playpause.classList.toggle('play');
    playpause.classList.toggle('pause');    
  }

  if (initNeeded) {
    logSection.innerHTML = generateSectionHtml(config.logConfig, LOG_CONFIG_LABELS, 'log');
    metricSection.innerHTML = generateSectionHtml(config.metricConfig, METRIC_CONFIG_LABELS, 'metric');
    stopEditing();
  }

  forEachConfigField(updateValueFunction, config);
}

function generateSectionHtml(sectionConfig, labelMap, prefix) {
  let sectionHtml = '';
  for (const field in sectionConfig) {
    const label = labelMap[field] || field;
    const value = sectionConfig[field];
    const id = prefix + '_' + field;
    const idNew = id + 'New';
    sectionHtml += '<div class="section-row">';
    sectionHtml += '<label class="item-label">' + label + '</label>';
    sectionHtml += '<div id="' + id + '" class="item-value"></div>';
    sectionHtml += '<input type="text" id="' + idNew + '" class="item-new-value">';
    sectionHtml += '</div>';
  }
  return sectionHtml;
}

function forEachConfigField(fieldFunction, aConfig) {
  for (const configField in aConfig) {
    if (configField.endsWith('Config')) {
      const prefix = configField.substring(0, configField.indexOf('Config'));
      for (const field in config[configField]) {
        fieldFunction(field, prefix, aConfig, configField);
      }      
    }
  }
}

function updateValueFunction(field, prefix, aConfig, configField) {
  document.getElementById(prefix + '_' + field).innerHTML = aConfig[configField][field];
}

function stopEditingFunction(field, prefix) {
  document.getElementById(prefix + '_' + field + 'New').style.display = 'none';  
}

function startEditingFunction(field, prefix, aConfig, configField) {
  const element = document.getElementById(prefix + '_' + field + 'New');
  element.style.display = 'inline-block';
  element.value = aConfig[configField][field];
}

function submitFunction(field, prefix, aConfig, configField) {
  aConfig[configField][field] = document.getElementById(prefix + '_' + field + 'New').value;
}

init();
