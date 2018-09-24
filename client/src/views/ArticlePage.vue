<template>
  <div class="page">
    <div class="loader" v-if="Object.keys(article).length === 0"></div>
    <div class="post" v-else>
    <div class="jumbo" style='background-image: url("https://source.unsplash.com/DnWYw0zLJBg"); height: 300px;'></div>
    <div class="anonymous">
      <h3> {{this.article.title}} </h3>
      <h6> {{this.article.author.name}} </h6>
      <br>
      <p> {{this.article.desc}} </p>
      <p class="pubDate"><em>Published</em> {{formatDate}} </p>
    </div>
    <textarea v-if="isLogin" class="comment" rows="4" cols="50" name="desc" v-model="inputcom" placeholder="Place your comment"></textarea>
    <button v-if="isLogin" class="subut" @click="submitComment">Comment</button>
    <div class="comment-list" v-for="item in comments" :key="item._id">
      <hr>
      <div class="commentes">
        <div class="comment-avatar"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAABblBMVEX///8A/9kA/9r/AKD/AKH6BaL0C6P8A6ED/NkP8NYG+dj4B6IJ9tfnGKYL9NfyDaTiHafdIqgg39L/+v3sE6UY59TQL6v1//7ZJqk3yM2iXbXIN637//4zzM4o19DVKqqGebvw//08w8ybZLf/5/axTrK6RbD/8/tCvcpUq8ZMs8iEe7wu0c+sU7NjnMNtksFT/+WTbLnS//iX//C0//ReocS4R7D/v+dIt8n/7fj/ccvBPq7/1vCpVrRol8J6hb6Lc7rH//f/rOD/y+z/RLre//pzjMD/WMH/qN//jNWD/+3/ZMZ9gb3/ntv/MLNH/+SN/+7/g9Gl//L/3fL/xOmvdcDPyuTcXL3HgciAzdqhiMXtRbik2OOh7+utvtu4otKjp9HbTLdq0tjmvuNZ6t/S7fK87u+YzN3jfsvqj9OO5uWJutTwccjd3O3aptjcbcTIsNq0ksvhq9zjmNW4yOCA3uDIbMDiyed8rc3d5vHJ9NvBAAAUi0lEQVR4nO1b60MaWbIP55x+0TQNTXcH6fCQBqR5owJqiyKiREWImt15ZGZ3MpuZuzObvZudvXN389/fOv2CJIg6m8x+uFNfRJGuOnXqVP1+VYdHj36T3+T/hyQ2CvvHb/9DintPz/bGo6kofbv9n1HMEYwJR0hc4bee/OqKGVnK2v32aZXF3UgIna9/esWMpziml1K5ppXPaFE+hCaEa6JQCLVOPqliwrFqXO+a1YPKmqJFQDFICETJYl2hL0Kzo0+kWEoaxfZhYyetCBHe1+sLOuCYpvc6vPkxFbtbPDjtlGuaEEbvK/ZFsHFJ8435RS54X7HobPEg2OJbFPs6LVau+P/AP8gDjuLLQDEnqnGjaE7e3+KVgnihiOsR/9fZ4weteEoVB1vcoVvsenrliuFdFI5ENe3Vq2fX25s/MaLl/z+6vkvxce/yylvxfbf4Hd18WKhVmoNU8eXLF6PpaLx3dTXFScX/4GxFJuhdXXgrfv8U36mY6p21Wudb29+9+dsLmYFUAMkAxPsppyqC8wy0Kh1fELrFS07xPfQebZ6sP3m00dubcq5ikaUvjNwgVUrKYAdrnNbCKNRalYyvcJ+e4rs9jfh39Xqy+3TEYCzGGMj77crOQYnBRQHxUaV8WoxxmIulKtrKI9BjSsLK2HL0nlO9J+uP31/K7uWII1I3VzlgSbFGc5FQ9YIPoXDmoCSDG7KXGysM2BjLO0sM8PRCOC/T6392COpjg3QEReu4q7mPgZfFiL9Zwk47CedpfJy43YIhlwq/s72u3s3b9fpyPOawNIB1h1BZlvLeMlCFiWWQ+zQqSgkTrP94+znYHal5z2VauvLHf/zjae+4sMLgYPlnImZTa7yja4CDVaBMjC07f2wdHV0/a+UNjPUyPzu6dTlnuB+BxFU76GdVehwJx0xHe0/3VxtRuOA4w4p4brdJJ9hHLSm6m0rz782VjMU+9Qh/KyzYn8pWuW2oHHbPr5yNyXCaxPHw7W0JNLFxPCJqTvOVajqbD7JeTZXX3F/Ody+nhNMbgvvGbUU5cUFUGau6SCTztJ3EybyS77QNFjPxv399tL6gdbew/3wIReJiPBIJM4kEi47aTFB3wm+4pIMCUNQaQZDkgnwY4reWGtCbYi6Zq1mikYdzlCnhCYQOL+yYEmaMTmvru5tjqBCQMEeQMd16zKoygfCv8f6z2zjna3l2gethegAqdRmz9Tw/P1rhZRkRYokzmgqK1N04RnnVcFyGwulqlqglI8568EOG4lTqtycHVrlmyhLGscFaxElf/DckXnON4d8wXMNJASzm9E50fsTRbFlC2h9z0iHsJUqrbdfWSFdyT1EIhRQbYymmErFfbXZ21jKa4OXqcDeVboMJar1ZViKzo5sp6Sq0HPIVicinzX6cw6zd1BYyTPjZsiDsTbmS4yTUYf3i2fZjCIUrcVxKK2tVqcq/m6sFY4D49CAJwSonS38eQrARo6NoawMJjhHkZi7Z3lnMsPz5suUnLkV54FqJqmraN4B1DUAZUxZTCl2WlbRC74igD+jflUY/LnolkGAmllWdV1ys3lH4BfWotTwLXHJcNez938A3INJV6XYi4SCJY82oa//ACNCdW5JemJ6TlMqXRUMiosh4OQRccZAJL2iHzb++JQUMpwQOqbvcAw+/QDDoGsSwVWJY03cKSsf8DUJbToreswX/8c82f/yd1NmxrA6IVcQQzIvq+dZt6h852VzsWhrN5jWp76w2YsIx1DolERNz8aAP/Jczh2UM1bL/5jWkMtODbEgzsLlw8PjZs82VcHADokfMmpbCR4rMJIpQ9JBlBu0sx2VzSWvhCKXqwWMdeLE7KvoxtrU7jgeu6jDqPCfOzo/uZmWFM4AzTNJs2lgsWpU+S8NJ7jY0Rc8veNLsBiXThdhD0fTC9+cLueG/J3RxMerrvy8nLAz3RowbxxzUA0Y1cnnwRS25YED4s/7csQ7ETVwxdkeJRjTLUJtBJaywwWleiUQ/2InjywuRqEap3j600g6SRJnkAlDRppP5L+fOZxKXUzFuA/azK4Ft0eLcAaHlif92uSRdD5N6OvXTQCeqzGPONwCy6NU4bpuWtvBvMmP5CSv8UEpcmKr5d46PWQyITaRfEubvPAs+k3j7dSvsoZ9QRMvbmK1alXxNgxJxvkLXcrnCZniu/vz6n2qwnQ2psnAi3q1p60fns4iSbwy6gMSdVMRK2VK7+c/dhxqwv+gC0JLYy+ZDNBp4KzaYm/ZBcG0c//AyKftwJiAmzHRvWHiYBXuLLmg9flQYxw9rmpYeSO2FDUDvBFdi/wyOEOZUSiYlPc6CDaVmrkhLBOGmr//0kAbRMSOVo1EvDqmjC3uipOtSshmd6w+11hOFm10PMO7viQSAv9npqFiq1gSlkmIxEA0oEdVuHHKK/Nmb7+53HAu9swuGxCjiyDUrUMuopxPPry7+t6ksxubsuyFwyenFm+9PHheAgZKYWYFc3iSxCq1/KNKUmQPqqFAk868UFGe5+5frzbv8sDvcmzL+7oEwyVSj9mx7kzKw9c3tZ62ZV1xR6+0FE+vWbUmu73wzJYx+mKFvaYaj1Tl+OeyVztbJye9fi2BCfae1vcoNBeBXmFVpHdclDsfNuqECqatbAnCUayedPz452jqHKry9O1armQiQ8UNJZTkdMI+D4zpccE7nqJgHFJw43oMQUSfRW0uyU4/Aj+UqiZ1mtFqbSWZ4IX1qs1AbKFjiZ+fbbk558gRORsxyPB3uSDh26OcgPoWbQQn6esR5JKFFCyGAbkK7ZYAKltZFqMhctlrjhZJswcahiEkgAzqAQMTSoVPyUPjcQzQ9r+5oORkbc8ArGGKQKVuPxvjQA6hQtnbPRMIZZXf/PoRlG5cilz2FkEMV0T2DaE3tOhkQCZ0uyxTTfmI6cVbTd7NjA+BCNQBdSHvB+gag7cQIYLH3mrp3gRqcvx+MsPxY1WURh/4jBCPpwS8UbbI4XvHDf/sJ5CovI2pVFatm2UNT5+tj4m8Bf7IvSi48QMIfR1DagT96z/vAA70pKXnvIjOueFHcVTP+wzoy1gOABeRumPWhIZ8vclgudWjlRFtPLontvcNvXuFulOZP5cAG+lrc8XFVeOv9MNwYE+bAf7forztqqy7HQHSZpUw0nfHZxflVN6hP6NUQzo5oNwGA8q2vVIC37t//IJIDxGvlQRaOVteKBuYvqY7ggdip60Y+5avNxHTNDQGDqANlp14q1S3HTbOjveK8lXAN9VOSMRfvN8uZTBfLE+oNrRkjTK5pArXk4mZADZbTAsikFwxjNxxQesC4uwg5LQUxSf3HdcvRSbejaVbXiX1+9js7SMro6NHNtFluJ4GFsFIcsghjn1oTw8tnXDw1pwb8+a3NgURvxDHZQV6gC6dbj9JJ3IwCK+RwsimgTl9x/th13IMOksqCAU/VNdhpKxVn/Azq1UFZB5jrUwO+tXWyKhPTNhOW7UlHx910RLB0IBY2hHiJloBoyivQVQcdoTWpEdSFrcTY4QaIr+lYKtmGIwDqTq285mfucGtrNSx3TIBCwBHKa2Ilg5ZTjOPVNA0eVEt5vYVK23litBgwpFBrKDb9qCGnkajgSDTCe0J7XNsr175oQ+9qRLk/J6pSMsnJFffoobLHmFHey1I7atsLa5SWvJOHTkk2KJjnm5ubRyCbmyf36k/PZeNm//nwpzf/89XP374gh94+530DKt4LfiK3FQo7+bIe97YHyNDEd8vD2vK3yJOnnDdpCSl9z+MTP9FFJ6p+uJO3TFUve0qbXDwTOOAj6AdnjDhPHz9wEhXK1DP+GsOVlwyrqtmcfx4UHed8/R/FAY9o79KLNTh/FOcoKR9thOjs4Xg4fPNjqzWbhWmwTUjM6878Eii+XHZHjH/cKrbZnBSbQQZ2UIYjTx6vr59sbv51ige8M6vQMunfH+8XCruP72qx3iaJjcJNYSMBnz/DPv1HtYn55RetWZiuFmKv9X6v74qoeaHWyZlFPaYyDAN48bPP//iHr76+3l7oqd+tu3B8uTcawadfvPjs82/+zs7HLQBl1uliT+j5+iCrFKaEtQ2J8/Kgywvo7MNoVzTIBFv3IOjwlKdjH5O6zR6gGcV5i2nFwCNx5WZ+KUk/ryYlBp4Qs5Ms2MPadFpB0dTqjACwEUAhm7Vp478LODre12UMgLAS9Phm28sfsTEc01Kktxs1i8WxSVqpNWwOG4pSydkqodMKC9bBz7ZWENX9PQbL3cmO0sZ2PhJZKxJdEcoDncVsvewXFNRaYkKiN+Ywk21TWhA2cbJMQxFpJiN26OAi3ayDDax9QLuQ4dvqIZB8LPfLtB8hJZ3mmFYEdAWAotKWAHQFGQZ9EH2FK2p5w6m5aEdmPSSMtJdujwCc/+0VIELGcNql/BJESrkXx9gViplQg3PbASiv1mneR/xaX8TJRnAAvXb7xvOnf/r++nr7TyPCBruE2g4Mc6TVY+Syj4pvqAlsylkH/2Gr9HhEAmw/kLx0Eil5wA9FG0nCtoPyF6K93ufjZMnurymmTOINP0hm22PidzPQ9e40+GXLY4+6FQktAaWFEZH9OUO4HuDNtt8rhvofx5w/AKeLe9J7Uc1EtU7R4DCZ8IHOjVHQrkdHiRGuer84rYxLjuCYW7ha7/mgNw2GHuF6AMZNDxUD0jBF0g2qAGDCwkunUKOynpKwNAmI0dYLnww5vIAczj1QoMwg2VnqAdorJ7LpahjIeZ8XuKCUz+RiGHZgHoYnj54OvPJc7ZQNzBkdIYiBdlAQC1PGy2L8UeGMhmGxFloeA5D1rxiSpQwTWYxb01CFHUAER9KDOMHxhRikqP6152iKD5QSobDbbak1SNLft/B/c+7UDJbwA6jnsk3h1lMA5xDQPWOcZsJKzNknlDHEnZDSKKq01eE3QP0a9Npv5KchUTY4OqyFdBdBgMqw6R4DpBi4TscYQp4ugcseKo7624dmu5DOuFjXlLC+I2iWQeSBmQROIXEB3aLrctz32tsmtFYCxMxxxa6KsVQ83UkXsZgTKFJKF4HtCJlK1YZ0KtsU2qLZs9Udio3ehTt9Vo2sC0rZrFmxWM7y6zyinaknjx+feSahRj0MBpCDyNoEcCwWJRkqULcDSCkGL3Q9JmKaJIGY8PdqGCduemfO7QGOY9h48Uvr1Wz2rUwcOMQrlYaVCbcoAinX3ZgUigc0apzxllYZlGKiV8QYt5pxbMwwO0rQ37iXONcYhr3n+29PTk7W1x/vTrEN6pRcUmaYWM45pOF2m/o5MilqdLCAU860B0WVyufOLSaOXumZvvjb3wEPbB9tPgAPLJM9wqW0ipHNWdZBX+46GFApFq10xexnaNLPYiPoy5wnNnb3e8Nhb393N/GR7m49ZwjXjRczNAbCVqzuKNNO60Wz8coZb49JkDPveUvlYULBBvbHgciSTl1VESGMWk8ebSRO/kzE+bz0I9/WcmRjjyFM26ty/CAbENMQ/9e90UsLEkHQUP9YgPxdSQynRPT7PZnkQZAWgAxBgj+VcTBJ4m8ZTP+7cjz1u44hPhUMTVADwoNwkC3N0Cf1AMgZYf383wxiPtzHMgACWcTtwAAaA4/XN7evr6+fnVOhl04+wnHYF3HVW3YnCAI4gMk1nebMgZcqo6+++/6r//ri23xN0aK8x63v1x24QzZGbrahBvjtEbQmY11rgwFAoECNYg3sZFaPS6qqSjHdTh2WtaA7c69MvEIA3ngTQzTxtwBZQBvCGZthUkKk1uzTNhEEpdPqdvvdgNQrizbc2S2/XQpT3wORbspvOB4Sink0q5JuFCWgJaqRovNGJm4kaTFjVXq1KWtacxtWVOM7pOcXZbQjBWzNxOwOVNnMJMthWU8dpIXwNwzRG4qgVIoMlPXKhN6iErODtaBVtaxNeB+5Im7fFWl2MK6OlHBcQcokjnG8TbebP38LxzXjYCPhdxwDxCKSOegCIFBTQUf7w0bpveQC6wIN6FrRH5zxs++nWM80YfWxnDOtQFuPhsQfLKLvxw61hpNRBpCDpYHfP7r1Fs0dBmQ1AHeTmHrgLkX7y48/q1iyGeBN/iWW8PXr4CITOupxqncDgv8CSAFsTdCu3Xr4oTwj4mQtF5dL3nxWqDPGgCUsJMLq/JZCpIuDBiIQkwCjnz86Bvoq1v1++ezhgXDMEFElxPTxtwVLghJ1mGNx/CCgz4JBgghtwcn1B83P3HqCYw2XF/yCQKQDF3o5sumtYeBgrlgm3Ihjse/dJAtFS/ORDf/9yK9RbmNhyBAsW+i2kc1dcjMihOOw5G5ruIgloGWw4SjdZ3GsmvEvs/WDPvoryW+b0ZmRw4zkgbKyR7Dagr3xD8DEXeYjGFivVVOU6QB3lQiXnGTc63zB2Bd2yR/ZnB/9/vUU7Nf/db5ybHeHJBK0Irh5GMqQHQ152xF+C8SLTgU0XrBx0btQAcSEdm5pj8HqS3QW+PlX/0Yq9mwYYYcwhpQ4rge+Bhh2Qy+AsLp5CkzRpAwvlKkTMgnxQsZq6yImzIsf/voRbvcDRHdmJQ4F4xcMoA0ueqnVmdvbjbXyJAsvioOUHaN/ZS9+evAQf6lASXKgBzUgwCAuCKHj+7MLp8kGxIQl/sViwkxHZ3dciry/7Ho1cakBIInd48ux0+8HaiWK0+n46rJ3s+ou7QMFgnC+BehDAxwjCvvPew61uinsfqyVBw8fYWdgRw1I8csN+KRCPRChk+WMtGBA+FN9eeVDgRio83mzEfEJqZvoPvn3dwK5AQAeKWLxtMwuxMDHmg7cQy4JaUaBDcUG7Pz2Kv/rfYfqZgrATKBEQObcrgWdCG7/ejtwRmDnlTj96hZx27D89cdgPfeWC8rP0iqxKQx12EnrV9QOWWCMkxqqiOTUymYdaLjyOxufwABajFGTMFZI0xz97/d8P7UBY6jwAmAhd4QeXn0p6FPIFWHskohLUeeO7K8afq7sT50v8zX52da/jW1+mfRGHGE++/qO8denlN3e0+cfsbz/Jr/Jf1z+D8lDxcA/S1lwAAAAAElFTkSuQmCC" alt=""></div>
          <div class="comment-box">
            <div class="comment-head">
              <span><em>{{formatDateInput(item.createdAt)}}</em></span>
              <h5 class="comment-name by-author"> {{item.owner.name}} says :</h5>
              <i class="fa fa-reply"></i>
              <i class="fa fa-heart"></i>
            </div>
            <div class="comment-content">
              {{item.comment}}
            </div>
            <button class="delCom" @click="deleteComment(item)">Delete</button>
          </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'article-page',
  props: ['isLogin'],
  data () {
    return {
      article: {},
      inputcom: '',
      comments: [],
      notif: '',
      self: '',
      baseUrl: 'http://myblog-server.hanabc.xyz'
    }
  },
  methods: {
    noToken () {
      this.notif = 'Login to access menu'
    },
    getArticleById () {
      axios
        .get(this.baseUrl + `/articles/${this.$route.params.id}`)
        .then(response => {
          this.article = response.data.article[0]
          this.comments = response.data.article[0].commentlist
        })
        .catch(err => {
          console.log('get error', err.response)
        })
    },
    deleteComment (data) {
      axios({
        method: 'DELETE',
        url: this.baseUrl + `/comments/${data._id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          this.$router.push('/articles')
        })
        .catch(err => {
          console.log('get error', err.response)
        })
    },
    submitComment () {
      axios({
        method: 'POST',
        url: this.baseUrl + `/comments/${this.$route.params.id}`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          comment: this.inputcom
        }
      })
        .then(response => {
          this.notif = response.data.message
          this.$router.push('/articles')
        })
        .catch(err => {
          console.log('get error', err.response)
          this.$router.push('/articles')
        })
    },
    formatDateInput (input) {
      let date = new Date(input)
      let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Augst', 'Sept', 'Oct', 'Nov', 'Dec']
      return date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear()
    }
  },
  created () {
  },
  mounted () {
    this.getArticleById()
  },
  computed: {
    formatDate () {
      let date = new Date(this.article.createdAt)
      let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Augst', 'Sept', 'Oct', 'Nov', 'Dec']
      return date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear()
    }
  }
}
</script>

<style scoped>
.single-com {
  margin: 5px auto;
  width: 80%;
  padding: 30px 40px 50px;
  height: auto;
  background: #2973b7;
  color: white;
  text-align: left;
  border-radius: 10px;
}

.post {
  margin: 50px auto 20px;
  padding-bottom: 50px;
  background: #fff;
  width: 970px;
  border-radius: 1px;
  box-shadow: 0 2px 3px -1px rgba(0, 0, 0, 0.4);
}
.post .anonymous {
  margin: 25px 50px;
}

.jumbo {
  width: 100%;
  background-position: 50% 85%;
}

.comment {
  width: 75%;
  padding: 10px;
  height: 100px;
  margin: 0;
  margin-left: -10%;
  border: 1px solid lightgrey;
}

.subut {
  height: 100px;
  width: 8%;
  background: #2973b7;
  color: lightgrey;
  position: absolute;
}

.delCom {
  margin-top: 20px;
  padding: 5px 10px;
  background: black;
}

.commentes {
  width: 80%;
  margin: 10px 10%;
  padding: 20px;
  text-align: left;
  background: #2973b7;
  color: #fff;
  display: flex;
}

.commentes .writer {
  text-align: right;
}

.comment-box {
  padding: 10px 0 0 20px;
}

.loader {
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid #2973b7; /* Blue */
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
    margin: 25% auto;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>
