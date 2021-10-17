import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { PostService } from '../post.service';
import { Post } from '../postmodel';
import { mimeType } from './mime_typeValidator';

@Component({
  selector: 'app-postcreate',
  templateUrl: './postcreate.component.html',
  styleUrls: ['./postcreate.component.css']
})
export class PostcreateComponent implements OnInit {
   isLoading:boolean=false;
   form!:FormGroup;
   postId:string|null=null;
   mode='create';
   p!:Post;
   imagePrev:string | ArrayBuffer | null= null;
  constructor(private postservice: PostService, public route:ActivatedRoute, private datepipe:DatePipe) { }

  ngOnInit(): void {

    this.form= new FormGroup({
      title : new FormControl('', { validators : [Validators.required, Validators.minLength(3)]}),
      content: new FormControl('', {validators : [Validators.required, Validators.minLength(10)]}),
      date: new FormControl(''),
      image: new FormControl(null, { validators:[Validators.required],asyncValidators: [mimeType]} )
    });
    this.route.paramMap.subscribe( (param:ParamMap)=>{
      if(param.has('postId'))
      {
        this.mode='edit';
        this.postId=param.get('postId');

        //this.isLoading=true;
        this.postservice.getPostById(this.postId!).subscribe(
          data=>{

            this.p={id:data._id, title:data.title, content:data.content, date:new Date(data.date), imagePath:data.imagePath, creator:data.creator};
            const d=this.datepipe.transform(this.p.date, "yyyy-MM-dd")
           // console.log(d);
            this.form.setValue({title:this.p.title, content:this.p.content, date:d, image: this.p.imagePath, creator:this.p.creator})

            this.imagePrev= this.p.imagePath;
          }
        )

      }
      else
      {
        this.mode='create';
        this.postId=null;
      }
    })
  }
  onImagePick(evnt:Event)
  {
    const file= (evnt.target as HTMLInputElement).files![0] ;

    this.form.patchValue({image:file});
    this.form.get('image')?.updateValueAndValidity();
    console.log(file);
    console.log(this.form);
    const reader= new FileReader();
    reader.onload= ()=>{this.imagePrev = reader.result};
    reader.readAsDataURL(file);
  }



  post()
  {
    
    this.isLoading=true
    if(this.form.invalid)
    return;

     const postl:Post={
       id:this.postId!,
       title:this.form.value.title,
       content:this.form.value.content,
       date:this.form.value.date,
        imagePath:null,
        creator: ""
     }

     if(this.mode==='create'){
     this.postservice.addPost(postl, this.form.value.image);
     }
     else{
       this.postservice.updatePost(postl, this.form.value.image);
     }
     this.form.reset();
  }

}
