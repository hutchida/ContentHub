<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h1>Lexis Recommends</h1>
        <h3>Total number of records: {{books.length}}</h3>
        <hr>
        <br>
        <br>
        <alert :message="message" v-if="showMessage"></alert>
        <button type="button" class="btn btn-success btn-sm" v-b-modal.book-modal>Add Search Term</button>
        <br>
        <br>
        <input
          v-model="searchTerm"
          class="form-control"
          placeholder="Search terms"
          v-on:input="onSearch"
        >
        <br>
        <br>
        <table
          class="table table-hover table-bordered table-striped"
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="busy"
          infinite-scroll-throttle-delay="500"
          infinite-scroll-immediate-check="false"
        >
          <thead>
            <tr>
              <th scope="col">Practice Area</th>
              <th scope="col" style="background-color: #E6F9F0">Search Term</th>
              <th scope="col" style="border-left: solid 1px #EEEEEE">Label</th>
              <th scope="col">ID</th>
              <th scope="col">Type</th>
              <th scope="col" style="border-left: solid 1px #EEEEEE">Label</th>
              <th scope="col">ID</th>
              <th scope="col">Type</th>
              <th scope="col" style="border-left: solid 1px #EEEEEE">Label</th>
              <th scope="col">ID</th>
              <th scope="col">Type</th>
              <th scope="col">Date Created</th>
              <th scope="col">Date Modified</th>
              <th scope="col">User</th>
              <th width="155"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(book, index) in books" :key="index">
              <template v-if="book.isVisible">
                <td>{{ book.pa }}</td>
                <td style="background-color: #E6F9F0">{{ book.searchterm }}</td>
                <td style="border-left: solid 1px #EEEEEE">{{ book.title1 }}</td>
                <td>{{ book.location1 }}</td>
                <td>{{ book.type1 }}</td>
                <td>{{ book.title2 }}</td>
                <td>{{ book.location2 }}</td>
                <td>{{ book.type2 }}</td>
                <td>{{ book.title3 }}</td>
                <td>{{ book.location3 }}</td>
                <td>{{ book.type3 }}</td>
                <td>{{ book.createdate }}</td>
                <td>{{ book.modifieddate }}</td>
                <td>{{ book.user }}</td>
                
                <td>
                  <button
                    type="button"
                    class="btn btn-warning btn-sm"
                    v-b-modal.book-update-modal
                    @click="editBook(book)"
                  >Update</button>
                  <button
                    type="button"
                    class="btn btn-danger btn-sm"
                    @click="onDeleteBook(book)"
                  >Delete</button>
                </td>
              </template>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <b-modal ref="addBookModal" id="book-modal" title="Add a new search term" hide-footer>
      <b-form @submit="onSubmit" @reset="onReset" class="w-100">
        <b-form-group id="form-title-group" label="Practice Area:" label-for="form-title-input">
          <b-form-input
            id="form-title-input"
            type="text"
            v-model="addBookForm.pa"
            required
            placeholder="Select Practice Area"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="form-author-group" label="Search term:" label-for="form-author-input">
          <b-form-input
            id="form-author-input"
            type="text"
            v-model="addBookForm.searchterm"
            required
            placeholder="Enter search term"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="form-author-group" label="Doc Title 1:" label-for="form-author-input">
          <b-form-input
            id="form-author-input"
            type="text"
            v-model="addBookForm.title1"
            required
            placeholder="Enter doc title"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="form-author-group" label="Doc ID 1:" label-for="form-author-input">
          <b-form-input
            id="form-author-input"
            type="text"
            v-model="addBookForm.location1"
            required
            placeholder="Enter doc ID"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="form-author-group" label="Doc Type 1:" label-for="form-author-input">
          <b-form-input
            id="form-author-input"
            type="text"
            v-model="addBookForm.type1"
            required
            placeholder="Select doc type"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="form-author-group" label="Doc Title 2:" label-for="form-author-input">
          <b-form-input
            id="form-author-input"
            type="text"
            v-model="addBookForm.title2"
            required
            placeholder="Enter doc title"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="form-author-group" label="Doc ID 2:" label-for="form-author-input">
          <b-form-input
            id="form-author-input"
            type="text"
            v-model="addBookForm.location2"
            required
            placeholder="Enter doc ID"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="form-author-group" label="Doc Type 2:" label-for="form-author-input">
          <b-form-input
            id="form-author-input"
            type="text"
            v-model="addBookForm.type2"
            required
            placeholder="Select doc type"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="form-author-group" label="Doc Title 3:" label-for="form-author-input">
          <b-form-input
            id="form-author-input"
            type="text"
            v-model="addBookForm.title3"
            required
            placeholder="Enter doc title"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="form-author-group" label="Doc ID 3:" label-for="form-author-input">
          <b-form-input
            id="form-author-input"
            type="text"
            v-model="addBookForm.location3"
            required
            placeholder="Enter doc ID"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="form-author-group" label="Doc Type 3:" label-for="form-author-input">
          <b-form-input
            id="form-author-input"
            type="text"
            v-model="addBookForm.type3"
            required
            placeholder="Select doc type"
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </b-modal>

    <b-modal ref="editBookModal" id="book-update-modal" title="Update" hide-footer>
      <b-form @submit="onSubmitUpdate" @reset="onResetUpdate" class="w-100">
        <b-form-group id="form-title-edit-group" label="Practice Area:" label-for="form-title-edit-input">
          <b-form-input
            id="form-title-edit-input"
            type="text"
            v-model="editForm.pa"
            required
            placeholder="Enter Practice Area"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="form-author-edit-group"
          label="Search Term:"
          label-for="form-author-edit-input"
        >
          <b-form-input
            id="form-author-edit-input"
            type="text"
            v-model="editForm.searchterm"
            required
            placeholder="Enter search term"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="form-author-edit-group"
          label="Label:"
          label-for="form-author-edit-input"
        >
          <b-form-input
            id="form-author-edit-input"
            type="text"
            v-model="editForm.title1"
            required
            placeholder="Enter label"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="form-author-edit-group"
          label="ID:"
          label-for="form-author-edit-input"
        >
          <b-form-input
            id="form-author-edit-input"
            type="text"
            v-model="editForm.location1"
            required
            placeholder="Enter ID"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="form-author-edit-group"
          label="Type:"
          label-for="form-author-edit-input"
        >
          <b-form-input
            id="form-author-edit-input"
            type="text"
            v-model="editForm.type1"
            required
            placeholder="Enter type"
          ></b-form-input>
        </b-form-group>
        
        <b-form-group
          id="form-author-edit-group"
          label="Label:"
          label-for="form-author-edit-input"
        >
          <b-form-input
            id="form-author-edit-input"
            type="text"
            v-model="editForm.title2"
            required
            placeholder="Enter label"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="form-author-edit-group"
          label="ID:"
          label-for="form-author-edit-input"
        >
          <b-form-input
            id="form-author-edit-input"
            type="text"
            v-model="editForm.location2"
            required
            placeholder="Enter ID"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="form-author-edit-group"
          label="Type:"
          label-for="form-author-edit-input"
        >
          <b-form-input
            id="form-author-edit-input"
            type="text"
            v-model="editForm.type2"
            required
            placeholder="Enter type"
          ></b-form-input>
        </b-form-group>

        
        <b-form-group
          id="form-author-edit-group"
          label="Label:"
          label-for="form-author-edit-input"
        >
          <b-form-input
            id="form-author-edit-input"
            type="text"
            v-model="editForm.title3"
            required
            placeholder="Enter label"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="form-author-edit-group"
          label="ID:"
          label-for="form-author-edit-input"
        >
          <b-form-input
            id="form-author-edit-input"
            type="text"
            v-model="editForm.location3"
            required
            placeholder="Enter ID"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="form-author-edit-group"
          label="Type:"
          label-for="form-author-edit-input"
        >
          <b-form-input
            id="form-author-edit-input"
            type="text"
            v-model="editForm.type3"
            required
            placeholder="Enter type"
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Update</b-button>
        <b-button type="reset" variant="danger">Cancel</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import Alert from "./Alert";
import { FormModel } from '../models/FormModel'

export default {
  data() {
    return {
      books: [],
      addBookForm: new FormModel(),
      editForm:  new FormModel(),
      message: "",
      showMessage: false,
      searchTerm: "",
      busy: false,
      isAllBooks: false,
    };
  },
  components: {
    alert: Alert
  },
  methods: {
    getBooks() {
      const path = `http://127.0.0.1:5000/range?start=${this.books.length}&size=10`;
      axios
        .get(path)
        .then(res => {
          this.books = res.data.books;
        })
        .catch(error => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    removeBook(bookID) {
      const path = `http://localhost:5000/books/${bookID}`;
      axios
        .delete(path)
        .then(() => {
          this.getBooks();
          this.message = "Book removed!";
          this.showMessage = true;
        })
        .catch(error => {
          // eslint-disable-next-line
          console.error(error);
          this.getBooks();
        });
    },
    onDeleteBook(book) {
      console.log(book.lrid)
      this.removeBook(book.lrid);
    },
    updateBook(payload, bookID) {
      const path = `http://localhost:5000/books/${bookID}`;
      axios
        .put(path, payload)
        .then(() => {
          this.getBooks();
          this.message = "Book updated!";
          this.showMessage = true;
        })
        .catch(error => {
          // eslint-disable-next-line
          console.error(error);
          this.getBooks();
        });
    },
    editBook(book) {
      this.editForm = book;
    },
    addBook(payload) {
      const path = "http://localhost:5000/books";
      axios
        .post(path, payload)
        .then(() => {
          this.getBooks();
          this.message = "Book added!";
          this.showMessage = true;
        })
        .catch(error => {
          // eslint-disable-next-line
          console.log(error);
          this.getBooks();
        });
    },
    initForm() {
      this.addBookForm = new FormModel();
      this.editForm = new FormModel();
    },
    onResetUpdate(evt) {
      evt.preventDefault();
      this.$refs.editBookModal.hide();
      this.initForm();
      this.getBooks(); // why?
    },
    onSubmitUpdate(evt) {
      evt.preventDefault();
      this.$refs.editBookModal.hide();      
      this.updateBook(this.editForm, this.editForm.lrid)
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.$refs.addBookModal.hide();
      this.addBook(this.addBookForm);
      this.initForm();
    },
    onReset(evt) {
      evt.preventDefault();
      this.$refs.addBookModal.hide();
      this.initForm();
    },
    onSearch() {
      // Loop over each book in array.
      this.books.map(book => {
        // If we have a search term and the length is > 2 characters proceed...
        if (this.searchTerm && this.searchTerm.length > 2) {
          // Set book to visible if book title includes search term.
          book.isVisible = book.title.includes(this.searchTerm);
        } else {
          // On all other senarios set book visible to true.
          book.isVisible = true;
        }
      });
    },
    loadMore: function() {
      if (!this.busy && !this.isAllBooks) {
        this.busy = true;
        axios
          .get(`http://127.0.0.1:5000/range?start=${this.books.length}&size=5`)
          .then(res => {
            res.data.books.forEach(book => this.books.push(book));
            this.busy = false;
            this.isAllBooks = res.data.books.length === 0;
          })
          .catch(error => {
            // eslint-disable-next-line
            console.error(error);
          });
      }
    }
  },
  created() {
    this.getBooks();
  }
};
</script>

