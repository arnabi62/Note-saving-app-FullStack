import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from './postmodel';
import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postList: Post[]=[]
  private postupdate=new Subject<Post[]>();
  getPost()
  {
    //return [...this.postList];
    this.httpClient.get<{message:string, post:any []}>('http://localhost:3000/post')
    .pipe(map((postData)=>{
      return postData.post.map(
        (        post: { title: string; content: string; _id: string; date: Date; imagePath:string })  =>
        {
          return {
            title:post.title,
            content:post.content,
            id:post._id,
            date:post.date,
            imagePath: post.imagePath
          };
        });
    }))
    .subscribe((body)=>
    {
      this.postList = body;
      this.postupdate.next([...this.postList]);
    });
  }

  getUpdatedPostListener()
  {
    return this.postupdate.asObservable();
  }

  getPostById(id:string)
  {
    return this.httpClient.get<{_id:string; title:string; content:string; date:Date; imagePath:string}>("http://localhost:3000/post/"+id);
  }

  updatePost(post:Post, image: File | string)
  { let postData : Post | FormData
    if(typeof(image)=== 'object')
    {
       postData = new FormData();
      postData.append("id", post.id)
      postData.append("title", post.title)
      postData.append("content", post.content)
      postData.append("date", post.date.toString());
      postData.append("image", image, post.title)
    }
    else{
    postData ={
        id : post.id,
        title : post.title,
        content : post.content,
        date : post.date,
        imagePath : image
      }
    }

    this.httpClient.put<{message:string, image:string}>("http://localhost:3000/post/"+post.id, postData)
    .subscribe(res => {
      const updatedpost = [...this.postList];
      const oldind= updatedpost.findIndex(p=> p.id === post.id);
      const p : Post = {
        id : post.id,
        title : post.title,
        content : post.content,
        date : post.date,
        imagePath : res.image
      }
      updatedpost[oldind]=post;
      this.postList=updatedpost;
      this.postupdate.next([...this.postList]);
     // console.log(updatedpost[oldind]);
      this.router.navigate(["/"]);
    });

  }
  addPost(post:Post, image:File)
  {
    const postData = new FormData();
    postData.append("title", post.title)
    postData.append("content", post.content)
    postData.append("date", post.date.toString());
    postData.append("image", image, post.title)
    this.httpClient.post<{message:string, id:string, p:any}>("http://localhost:3000/post", postData).subscribe(response =>
      {

        post.id=response.id;
        console.log(response.p);
        this.postList.push(post);
      this.postupdate.next([...this.postList]);
      this.router.navigate(["/"]);


      }
    )

  }

  deletePost(id:string)
  {
    this.httpClient.delete("http://localhost:3000/post/"+id).subscribe(()=>{
      //console.log("deleted!");
      const updatedpost = this.postList.filter(p => p.id != id);
      this.postList = updatedpost;
      this.postupdate.next([...this.postList]);
    }
    );
  }
  constructor(private httpClient:HttpClient,  private router:Router) { }
}
