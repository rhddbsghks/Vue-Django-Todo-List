axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

let vm = new Vue({
  delimiters: ["[[", "]]"],
  el: "#app",
  data: {
    name: "",
    todo: "",
    todoList: [],
  },

  created: function () {
    console.log("created...");
    this.fetch_all_todo();
  },

  methods: {
    fetch_all_todo: function () {
      console.log("fetch all///");

      let vmtmp = this;
      axios
        .get("/api/todo/list")
        .then(function (res) {
          console.log("GET RES", res);
          vmtmp.todoList = res.data;
        })
        .catch(function (err) {
          console.log("GET ERR", err);
        });
    },

    add_todo: function () {
      if (this.todo == "") return;
      if (this.name == "") this.name = "홍길동";

      let postData = { name: this.name, todo: this.todo };
      let vmtmp = this;

      axios
        .post("/api/todo/create/", postData)
        .then(function (res) {
          console.log("POST RES", res);
          vmtmp.todoList.push({
            id: res.data.id,
            name: res.data.name,
            todo: res.data.todo,
          });
        })
        .catch(function (err) {
          console.log("err");
        });

      this.name = "";
      this.todo = "";
    },

    remove_todo: function (todo, index) {
      if (confirm("Really delete?") == false) return;

      let vmtmp = this;
      axios
        .delete(`/api/todo/${todo.id}/delete/`)
        .then(function (res) {
          console.log("del res", res);
          vmtmp.todoList.splice(index, 1);
        })
        .catch(function (err) {
          console.log("err");
        });
    },
  },
});
