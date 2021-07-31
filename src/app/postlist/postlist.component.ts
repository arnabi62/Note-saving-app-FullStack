import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService } from '../post.service';
import {Post} from  '../postmodel'
@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.css']
})
export class PostlistComponent implements OnInit, OnDestroy {
  //@Input()
  postList:Post[]=[];
  isL:boolean=false;
  private postSub!:Subscription
  constructor(private postService:PostService) { }

  onDel(id:string)
  {
    this.postService.deletePost(id);
  }
  ngOnInit(): void {
    //this.isL=true;
    this.postService.getPost();
    this.postSub=this.postService.getUpdatedPostListener().subscribe(
      (posts:Post[])=>{
        this.isL=false
      this.postList=posts
      })
  }
  ngOnDestroy(){
    this.postSub.unsubscribe();
  }

}
