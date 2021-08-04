import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
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
  length=0;
  postPerPage=5;
  pageSizeOption=[1,2,5,10];
  currPage=1;
  searchedKeyword!:string;
  private postSub!:Subscription
  constructor(private postService:PostService) { }

  onDel(id:string)
  {

    this.postService.deletePost(id).subscribe(()=>{
      if((this.length -1) ===this.postPerPage * (this.currPage - 1))
      {
        this.currPage = 1;
      }
      this.postService.getPost(this.postPerPage, this.currPage)
    });
  }

  onPageChange(pagedata: PageEvent)
  {
    this.currPage=pagedata.pageIndex+1;
    this.postPerPage=pagedata.pageSize;
    this.postService.getPost(this.postPerPage, this.currPage);
  }
  ngOnInit(): void {
    //this.isL=true;
    this.postService.getPost(this.postPerPage, this.currPage);
    this.postSub=this.postService.getUpdatedPostListener().subscribe(
      (postdata:{posts: Post[], maxcount: number})=>{
        this.isL=false
      this.postList=postdata.posts;
      this.length = postdata.maxcount

      })

  }
  ngOnDestroy(){
    this.postSub.unsubscribe();
  }

}
