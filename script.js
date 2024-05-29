let taskList = [];

const hoursPerWeek = 24 * 7;

const handleOnSubmit = (e) => {
  const formData = new FormData(e);
  const task = formData.get("task");
  const hr = +formData.get("hr");
  const obj = {
    task,
    hr,
    id: randomIdGenerator(),
    type: "entry",
  };

  //check if enough hours available
  const existingTtlHours = taskTotal();

  if (existingTtlHours + hr > hoursPerWeek) {
    return alert(
      "Sorry boss not enough time Left Please delete some Dreams and come back"
    );
  }

  taskList.push(obj);
  displayEntryList();
};

const displayEntryList = () => {
  let str = "";

  const entryElm = document.getElementById("entryList");

  const entryList = taskList.filter((item) => item.type === "entry");

  entryList.map((item, i) => {
    str += `<tr>
    <td>${i + 1}</td>
    <td>${item.task}</td>
    <td>${item.hr}</td>
    <td class="text-end">
      <button onclick="handleOnDelete('${item.id}')" class="btn btn-danger">
        <i class="fa-solid fa-trash-can"></i>
      </button>
      <button onclick="switchTask('${item.id}','bad')" class="btn btn-success">
        <i class="fa-solid fa-right-from-bracket"></i>
      </button>
    </td>
  </tr>`;
  });

  entryElm.innerHTML = str;
  taskTotal();
};

const displayBadList = () => {
  let str = "";

  const badElm = document.getElementById("badList");

  const badList = taskList.filter((item) => item.type === "bad");

  badList.map((item, i) => {
    str += `<tr>
      <td>${i + 1}</td>
      <td>${item.task}</td>
      <td>${item.hr}</td>
      <td class="text-end">
        
        <button onclick="switchTask('${
          item.id
        }','entry')" class="btn btn-warning">
        <i class="fa-solid fa-circle-left"></i>
        </button>
        <button onclick="handleOnDelete('${item.id}')" class="btn btn-danger">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </td>
    </tr>`;
  });

  badElm.innerHTML = str;
  document.getElementById("savedHours").innerText = badList.reduce(
    (acc, item) => acc + item.hr,
    0
  );
};

const randomIdGenerator = (lenght = 6) => {
  const str = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZCVBNM";
  let id = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * str.length);
    id += str[randomIndex];
  }
  return id;
};

const handleOnDelete = (id) => {
  if (window.confirm("Are you sure, you want to delete this task")) {
    taskList = taskList.filter((item) => item.id !== id);
    displayEntryList();
    displayBadList();
  }
};

const switchTask = (id, type) => {
  taskList = taskList.map((item) => {
    if (item.id === id) {
      item.type = type;
    }
    return item;
  });
  displayEntryList();
  displayBadList();
};

const taskTotal = () => {
  const ttlHr = taskList.reduce((acc, item) => {
    return acc + item.hr;
  }, 0);
  document.getElementById("totalHours").innerText = ttlHr;
  return ttlHr;
};
