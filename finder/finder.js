// http://product-data-service-staging.herokuapp.com/

const fetchProductFinderData = () => {
  const postcode = getPostcodeFromInput()
  mockFetchProductFinder(postcode, '').then(data => {
    const markup = mapStoreDataToMarkup(data)
    setFinderResults(markup)
  }).catch(handleProductFinderError)
}

const mockFetchProductFinder = (postcode, retailLineCode = '') => {
  return new Promise(function(resolve, reject) {
    const mockData = [{ name: 'Corporation street', distance: '0.05 miles'}, { name: 'Manchester - high street', distance: '0.35 miles'}, { name: 'Green quarter', distance: '1 mile'}]
    const shouldReject = Boolean(Math.random() > 0.5);
    shouldReject ? reject('Sorry, something went wrong.') : resolve(mockData);
  });
}

const fetchProductFinder = (postcode, retailLineCode = '') => {
  return fetch(`http://product-data-service-staging.herokuapp.com/`)
}

const getPostcodeFromInput = () => document.querySelector('input[name=postcode]').value;

const mapStoreDataToMarkup = data => data.map(store => `<li class="results--item">
  <div class="results-item--store-details">
    <span class="results-item--store-name">${store.name}</span>
    <span class="results-item--distance">${store.distance}</span>
  </div>
  <div class="results-item--store-link-container">
    <a class="results-item--store-link" href="https://finder.coop.co.uk/food" noopener noreferrer target="_blank">View store details</a>
  </div>
</li>`
)
.join("")

const setFinderResults = htmlString => {
  resetResultsBoxAndClearError()
  document.querySelector('#finder--results').innerHTML = htmlString;
}

const handleProductFinderError = error => {
  resetResultsBoxAndClearError()
  document.querySelector('#finder--results--error').innerHTML = error;
}

const resetResultsBoxAndClearError = () => document.querySelectorAll('#finder--results, #finder--results--error').forEach(o => o.innerHTML = null)
