const apiUrl = "https://api.crowdreport.me";
let fetchAsJSON = async function(url, options) {
  let err = null;
  let data = null;
  try {
    let response = await fetch(url, options);
    if (response.status == 429) {
      err = {
        name: "Too Many Requests",
        message:
          "You are sending to many requests. Please wait and then try again.",
      };
    } else {
      data = await response.text();
      data = JSON.parse(data);
      if (response.status < 200 || response.status > 299) {
        err = data;
      }
    }
  } catch (e) {
    console.log(e);
    err = {
      name: "Network Error",
      message:
        "We did not recieve a response from our backend server. Please try again later.",
    };
  }
  return { err, data };
};

// Fetch login url for google
let fetchLoginUrl = async function() {
  let res = await fetchAsJSON(`${apiUrl}/loginUrl`, { method: "GET" });
  return res;
};

// Gets access token line exchange for code and state
let fetchAccessToken = async function(state, code) {
  let res = await fetchAsJSON(
    `${apiUrl}/accessToken?state=${state}&code=${code}`,
    { method: "GET" }
  );
  return res;
};

let fetchUserData = async function(accessToken) {
  let res = await fetchAsJSON(`${apiUrl}/userData`, {
    method: "GET",
    headers: { Authorization: "Bearer " + accessToken },
  });
  return res;
};

let fetchUserArticles = async function(accessToken, sort, period, limit, offset) {
  let res = await fetchAsJSON(
    `${apiUrl}/userArticles?sort=${sort}&period=${period}&limit=${limit}&offset=${offset}`, { 
      method: "GET",
      headers: { Authorization: "Bearer " + accessToken },
    },
  );
  return res;
}

let fetchArticle = async function(id) {
  let res = await fetchAsJSON(`${apiUrl}/articles/${id}`, {
    method: "GET",
  });
  return res;
};

let fetchTags = async function() {
  let res = await fetchAsJSON(`${apiUrl}/tags`, { method: "GET" });
  return res;
};

let search = async function(q, sort, period, limit, offset) {
  let res = await fetchAsJSON(
    `${apiUrl}/search?q=${q}&sort=${sort}&period=${period}&limit=${limit}&offset=${offset}`,
    { method: "GET" }
  );
  return res;
}

let createArticle = async function(
  accessToken,
  imageUrl,
  title,
  body,
  tags,
  captcha,
  replaceId = -1,
) {
  let data = new URLSearchParams();
  data.append("imageUrl", imageUrl);
  data.append("title", title);
  data.append("body", body);
  data.append("tags", tags.join(","));
  data.append("captcha", captcha);
  data.append("replaceId", replaceId)
  let res = await fetchAsJSON(
    `${apiUrl}/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + accessToken,
      },
      body: data,
    }
  );
  return res;
};

let deleteArticle = async function(accessToken, id) {
  let res = await fetchAsJSON(`${apiUrl}/articles/${id}?`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + accessToken },
  });
  return res;
}

let uploadImage = async function(accessToken, image) {
  let data = new FormData();
  data.append("image", image);
  let res = await fetchAsJSON(
    `${apiUrl}/uploadImage`,
    {
      method: "POST",
      headers: { Authorization: "Bearer " + accessToken },
      body: data,
    }
  );
  return res;
};

let heart = async function(accessToken, articleId) {
  let data = new FormData();
  data.append("articleId", articleId);
    let res = await fetchAsJSON(
    `${apiUrl}/heart`,
    {
      method: "POST",
      headers: { Authorization: "Bearer " + accessToken },
      body: data,
    }
  );
  return res;
}

let hearted = async function(accessToken, articleId) {
  let res = await fetchAsJSON(`${apiUrl}/articles/${articleId}/hearted`, {
    method: "GET",
    headers: { Authorization: "Bearer " + accessToken },
  });
  return res;
}

export {
  fetchLoginUrl,
  fetchAccessToken,
  fetchUserData,
  fetchUserArticles,
  fetchArticle,
  fetchTags,
  search,
  createArticle,
  uploadImage,
  deleteArticle,
  heart,
  hearted
};
