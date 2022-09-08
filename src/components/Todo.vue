<template>
    <div class="todo-ctrn">
        <h1 class="title is-1 is-spaced" >Manage page</h1>
        <form @submit.prevent="addTodo">
            <div class="field has-addons mb-5">
                <div class="control">
                    <input  v-model="newTodoContent"  class="input" type="text" placeholder="Add task !">
                </div>
                <div class="control">
                    <button :disabled="!newTodoContent" class="button is-info">
                    Add
                    </button>
                </div>
            </div>
        </form>

        <div  v-for="todo in todos" class="card mb-5">
            <div :class="{ 'has-background-success-light' : todo.done }" class="card-content">
                <div class="columns is-mobile is-vcentered">
                    <div class="column">
                        <div class="content" :class="{ 'has-text-success line-through' : todo.done }">
                            {{ todo.desc }}
                        </div>
                    </div>
                    <div class="column is-5 has-text-right">
                        <button  :class="todo.done ? 'is-success' : 'is-light'" class="button" @click="toggleDone(todo.id)">&check;</button>
                        <button class="button is-danger ml-2" @click="removeTodo(todo.id)">&cross;</button>
                    </div>  
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    //import
    import {ref, onMounted} from 'vue';
    //firestore
    import { db } from '@/firebase'
    import { doc, collection, onSnapshot, deleteDoc, addDoc, query, orderBy, updateDoc} from "firebase/firestore"; 

    const todos = ref([]);
    /**
     * Firebase refs
     */
    const todosCollectionRef = collection(db, "todos");
    const todosCollectionQuery = query(todosCollectionRef, orderBy('date', ));
    /**
     * get Todos
     */
        onMounted(  () => {
            onSnapshot(todosCollectionQuery, (querySnapshot) => {
                let fbTodos = [];
                querySnapshot.forEach((doc) => {
                    const todo = {
                        id: doc.id,
                        desc: doc.data().desc,
                        done: doc.data().done
                    }
                    fbTodos.push(todo);
                });
                todos.value = fbTodos;
            });
        })
    /* 
    *   Add Todo
    */ 
   var newTodoContent = ref('');

   const addTodo = () => {
        try {
            const docRef = addDoc(todosCollectionRef, {
                desc: newTodoContent.value,
                done: false,
                date: Date.now(),
            });
            newTodoContent = '';
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    /* 
        Remove Todo
    */ 
    const removeTodo = id => {
        // todos.value = todos.value.filter( todo => todo.id !== id );
        deleteDoc(doc(todosCollectionRef, id));
    };

    /* 
        Validate Todo
    */ 
    const toggleDone = id => {
        let index = todos.value.findIndex(todo => todo.id === id);
        const todoRef = doc(todosCollectionRef, id);
        updateDoc(todoRef, {
            done: !todos.value[index].done
        });
    };
</script>

<style>
    .todo-ctrn {
        max-width: 500px;
        padding: 20px;
        margin: 0 auto; /* centred item */
    }
</style>
