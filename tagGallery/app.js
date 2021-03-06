document.addEventListener('DOMContentLoaded', () => {
	
	const imagesList = document.getElementById('imagesList');
	const tagsDiv = document.querySelector('#tags');
	const submitURL = document.querySelector('#submitURL');
	const newTagDiv = document.querySelector('#newTag');
	
	function addNewImageLi(newURL){
		const li = document.createElement('li');
		li.innerHTML = `
		<img src= ${newURL} width = 300>
		<div></div>
		<div><button class="removeButton">remove</button></div>
		`;
		li.querySelector('button').style.display = 'none';
		imagesList.prepend(li);
	}	
	function displayRemoveButtons(display){
		const lis = imagesList.querySelectorAll('li');
		for (let i = 0; i < lis.length; i++){
			if(display) {
				lis[i].querySelector('.removeButton').style.display = '';
			}
			else if(!display) {
				lis[i].querySelector('.removeButton').style.display = 'none';
			}
		}
	}
	
	function listAllTagsNames(){
		const names = [];
		const tags = tagsDiv.children;
		for(let i=0; i<tags.length; i++){
			names.push(tags[i].textContent);
		}
		return names;
	}

	function listLiTagsNames(li){
		const names = [];
		const tags = li.querySelectorAll('button.activeTag');
		for(let i=0; i<tags.length; i++){
			names.push(tags[i].textContent);
		}
		return names;
	}

	function showAllTags(li) {
		//list of all tags
		allNames = listAllTagsNames();
		//list of active tags
		liNames = listLiTagsNames(li);
		//clean the prevoius tags
		li.querySelector('div').innerHTML = "";

		let j = 0;
		for (let i=0; i<allNames.length; i++){
			if(allNames[i] == liNames[j]) {
				addActiveTag(li, allNames[i]);
				j++;
			}
			else {
				addInactiveTag(li, allNames[i]);
			}	
		}
	}

	function showActiveTags(li) {
		//list of active tags
		liNames = listLiTagsNames(li);
		//clean the prevoius tags
		li.querySelector('div').innerHTML = "";

		for (let i=0; i<liNames.length; i++){
			addActiveTag(li, liNames[i]);
		}	
	}
	function addActiveTag(li, tag) {
		li.querySelector('div').innerHTML = li.querySelector('div').innerHTML + 
		`<button class = 'activeTag'>${tag}</button>`;
	}

	function addInactiveTag(li, tag) {
		li.querySelector('div').innerHTML = li.querySelector('div').innerHTML + 
		`<button class = 'inactiveTag'>${tag}</button>`;
	}
		

	//setup images on page
	const imgLinks = [	
	"data:image/jpeg;base64,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",
	"data:image/jpeg;base64,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",
	"https://thenypost.files.wordpress.com/2018/10/102318-dogs-color-determine-disesases-life.jpg?quality=90&strip=all&w=618&h=410&crop=1"
	];
	for(let i=0; i<imgLinks.length; i++){
		addNewImageLi(imgLinks[i]);
	}

	submitURL.addEventListener('submit', (e) => {
		e.preventDefault();
		const newURL = submitURL.querySelector('input').value;
		submitURL.querySelector('input').value = "";
		addNewImageLi(newURL);
	});
	
	//change between active and inactive tags
	imagesList.addEventListener('click', (e) => {
		if(e.target.className == 'activeTag') {
			e.target.className = 'inactiveTag'
		}
		else if(e.target.className == 'inactiveTag') {
			e.target.className = 'activeTag'
		}
		else if(e.target.className == 'removeButton') {
			imagesList.removeChild(e.target.parentNode.parentNode);
		}
	});
	
	//add new tag name
	newTagDiv.addEventListener('submit', (e) => {
		e.preventDefault();
		//adding a new tag
		const newTagText = newTagDiv.querySelector('input').value;
		newTagDiv.querySelector('input').value = "";
		const newTag = document.createElement('button');
		newTag.textContent = newTagText;
		newTag.className = 'activeTag';
		tagsDiv.appendChild(newTag);

	});
	
	//filtering
	document.querySelector('#tags').addEventListener('click', (e) => {
			if(e.target.tagName == 'BUTTON'){
				if(e.target.className == 'activeTag'){
					e.target.className = 'inactiveTag';		
					lisWithTag(e.target.textContent, "none");
				}
				else if(e.target.className == 'inactiveTag'){
					e.target.className = 'activeTag';	
					lisWithTag(e.target.textContent, "");	
				}
			}
		});

	
	function lisWithTag(tag, displaySet){
		const lis = document.querySelectorAll('#imagesList li');
		for(let i = 0; i < lis.length; i++){
			const li = lis[i];
			tags = li.querySelectorAll(".activeTag");
			for(let j = 0; j < tags.length; j++){
				if(tags[j].textContent == tag){
					li.style.display = displaySet;
					break
				} 
			}
		}
	}

	//switching editing view
	document.querySelector('#editGallery').addEventListener('click', (e) => {
		const lis = imagesList.querySelectorAll('li');
		if(e.target.textContent == 'Edit Gallery'){
			for(let i=0; i<lis.length; i++) {
				showAllTags(lis[i]);
			}
			displayRemoveButtons(true);
			e.target.textContent = 'Ready';	
		}
		else if(e.target.textContent == 'Ready'){
			for(let i=0; i<lis.length; i++) {
				showActiveTags(lis[i]);
			}
			displayRemoveButtons(false);
			e.target.textContent = 'Edit Gallery';	
		}

	});

  //jquery ajax flickr
  $('#flickrForm').submit( (e) => {
    e.preventDefault();
     
    const tags = $('#flickrForm input').val();
    const flickrAPI = "//api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    const flickrOptions = {
      tags: tags,
      format: "json"  
    }
    function displayFirstPhoto(data){
      const randomI = Math.floor(Math.random()*data.items.length);
      addNewImageLi(data.items[randomI].media.m);
    }
    $.getJSON(flickrAPI, flickrOptions, displayFirstPhoto);
  })
  
})  
  
  
  
  
  
  
  
  
  