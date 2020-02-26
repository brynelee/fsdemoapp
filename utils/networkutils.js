import {Fetch} from 'react-native';

// GET method implementation:
async function getData(url = '') {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      //credentials: 'same-origin', // include, *same-origin, omit
      credentials: 'include', // for cross origin setup
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
        //'Content-Type': 'application/x-www-form-urlencoded'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
    });
    return await response.json(); // parses JSON response into native JavaScript objects
}

/*
demo usage:

    postTest2 = () => {
        let urlLogin = 'http://192.168.3.127:8081/usercenter/login';
        let params = 'username=dahai&password=666666'
        
        fetch(urlLogin , {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: params,
        }).then((response) => {
        if (response.ok) {
            return response.json();
        }
        }).then((json) => {
        alert(JSON.stringify(json));
        }).catch((error) => {
        console.error(error);
        });

    }

*/

// POST method implementation:
// data的格式应该是: let data = 'param1=xxxx&param2=yyyy';
async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      //credentials: 'same-origin', // include, *same-origin, omit
      credentials: 'include', // for cross origin setup
      headers: {
        //'Content-Type': 'application/json; charset=UTF-8'
        'Content-Type': 'application/x-www-form-urlencoded' // Java server 不能识别Fetch API 中发出json的方式
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: data // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
}



export {postData, getData};


// for exercise purpose

postTest = () => {
    let urlLogin = 'http://192.168.3.127:8081/usercenter/login';
    let formData = new FormData();
     formData.append("username","dahai");
     formData.append("password","666666");
    
    fetch(urlLogin , {
      method: 'POST',
      headers: {},
      body: formData,
    }).then((response) => {
      if (response.ok) {
          return response.json();
      }
    }).then((json) => {
      alert(JSON.stringify(json));
    }).catch((error) => {
      console.error(error);
    });

  }

  postTest2 = () => {
    let urlLogin = 'http://192.168.3.127:8081/usercenter/login';
    let params = 'username=dahai&password=666666';
    
    fetch(urlLogin , {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: params,
    }).then((response) => {
      if (response.ok) {
          return response.json();
      }
    }).then((json) => {
      alert(JSON.stringify(json));
    }).catch((error) => {
      console.error(error);
    });

  }
