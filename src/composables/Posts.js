import axios from "axios";
import { ref } from "vue";

export default function userposts()
{
    const posts = ref([])
    const getPosts = async(page) => {
        axios.get('/api/posts?page='+page)
            .then((response) => {
                posts.value = response.data;
            })
    }

    return {
        posts, getPosts
    }
}
