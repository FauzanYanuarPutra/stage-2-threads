export async function getThread() {
  const res = await fetch("http://localhost:5000/api/v1/threads");

  if (!res.ok) throw Error("Failed getting hero");

  const data = await res.json();
  return data;
}


export async function getThreadDetail() {
  
  const res = await fetch("http://localhost:5000/api/v1/threads");

  if (!res.ok) throw Error("Failed getting hero");

  const data = await res.json();
  return data;
}


export async function getUser(login: number) {
  try {
    const res = await fetch(`http://localhost:5000/api/v1/user/${login}`);

    if (!res.ok) throw Error("Failed getting hero");

    const data = await res.json();
    
    return data;
  } catch (error) {
    return error
  }
}

export async function allUser() {
  const res = await fetch(`http://localhost:5000/api/v1/users`);

  if (!res.ok) throw Error("Failed getting hero");

  const data = await res.json();
  return data;
}


export async function checkToken() {
  try {
    const token = localStorage.getItem('token');

    const userDatas = await fetch('http://localhost:5000/api/v1/check-token', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return res.json()
    })
      .catch((err) => {
        return err
      });

    return userDatas
  } catch (error) {
    return error
  }
}

