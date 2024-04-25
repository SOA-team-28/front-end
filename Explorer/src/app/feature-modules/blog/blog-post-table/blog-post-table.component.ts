import { Component, OnInit } from '@angular/core';
import { BlogPost, BlogPostStatus } from '../model/blog-post.model';
import { BlogService } from '../blog.service';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { ImageService } from 'src/app/shared/image/image.service';
import { Rating } from '../model/blog-rating.model';
import { UserSocialProfileService } from '../../user-social-profile/user-social-profile.service';
import { SocialProfile } from '../../user-social-profile/model/social-profile.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { Account } from '../../administration/model/account.model';

@Component({
  selector: 'xp-blog-post-table',
  templateUrl: './blog-post-table.component.html',
  styleUrls: ['./blog-post-table.component.css']
})
export class BlogPostTableComponent implements OnInit {
  filteredBlogPosts: BlogPost[] = [];
  blogPosts: BlogPost[] = [];
  selectedStatus?: BlogPostStatus;
  pageSize = 5;
  pageIndex = 1;
  totalBlogPosts = 0;
  socialProfile: SocialProfile[]=[]
  idsFollowed: number[]=[]
  loggedInUser:number=0
  accounts:Account[]=[]
  constructor(private service: BlogService, private router: Router, private imageService: ImageService,private socialService: UserSocialProfileService,private authService:AuthService) { 
    this.authService.user$.subscribe(user => {
      this.loggedInUser = user.id
    })
   this.getFollowedIds(this.loggedInUser)
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.loggedInUser = user.id
    })

    this.getFollowedIds(this.loggedInUser)
    
    
  }

  loadBlogPosts(): void {
    this.authService.user$.subscribe(user => {
      this.loggedInUser = user.id
    })
    this.service.getBlogPosts(this.pageIndex, this.pageSize, this.selectedStatus).subscribe((result) => {
      this.blogPosts = result.results;
     // Filtriranje blogova na osnovu uslova
    for(let j=0; j<this.blogPosts.length;j++) {
      console.log('usao')
      
      console.log('ideeeviii',this.idsFollowed.length)
      for (let i = 0; i < this.idsFollowed.length; i++){

        console.log('foloweeed')
        if (this.idsFollowed[i]==this.blogPosts[i].userId || this.blogPosts[i].userId==this.loggedInUser){
          this.filteredBlogPosts.push(this.blogPosts[i])
        }
      }
    }
    
    this.blogPosts = this.filteredBlogPosts;
    const uniquePosts = [];
    const map = new Map();
    
    for (const post of this.blogPosts) {
        if (!map.has(post.id)) {
            map.set(post.id, true);    // post.id (ili neko drugo polje koje garantuje jedinstvenost)
            uniquePosts.push(post);
        }
    }
    
    this.blogPosts = uniquePosts;
    

    console.log('blogovi',this.blogPosts)

      this.totalBlogPosts = result.totalCount;
    });
  }

  onRowSelected(selectedBlogPost: BlogPost): void {
    this.router.navigate(['/blogs', selectedBlogPost.id]);
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex + 1;
    this.loadBlogPosts();
  }

  onPageSizeChange(event: any): void {
    this.pageSize = event.value;
    this.pageIndex = 1;
    this.loadBlogPosts();
  }
  getImageUrl(imageName: string): string {
    return this.imageService.getImageUrl(imageName);
  }
  getUpvoteCount(blog: BlogPost): number {
    return blog.ratings ? blog.ratings.filter(rating => rating.rating === Rating.Upvote).length : 0;
  }

  getDownvoteCount(blog: BlogPost): number {
      return blog.ratings ? blog.ratings.filter(rating => rating.rating === Rating.Downvote).length : 0;
  }
  get thumbsUpEmoji(): string {
    return '\u{1F44D}';
  }

  get thumbsDownEmoji(): string {
    return '\u{1F44E}';
  }

  getFollowedIds(userId:number){
    console.log('user',userId)
    this.socialService.getSocilaProfile(userId).subscribe({
      next:(response:SocialProfile)=>{
       console.log(response)
       if(response!=null){
        this.accounts= response.followed
       console.log("usao")
        
        for (let acc of this.accounts) {
         this.idsFollowed.push(acc.id)
         console.log('FOLOWED', this.idsFollowed)
        }

        //popunjeni idevi
        //
        this.loadBlogPosts()
      }else{
        this.findMyPost()
      }
      }
    })
  }



  findMyPost(){
    this.service.getBlogPosts(this.pageIndex, this.pageSize, this.selectedStatus).subscribe((result) => {
      this.blogPosts = result.results;
     // Filtriranje blogova na osnovu uslova

    for(let i=0; i<this.blogPosts.length;i++) {
        if ( this.blogPosts[i].userId==this.loggedInUser){
          this.filteredBlogPosts.push(this.blogPosts[i])
        }
    }
    
    this.blogPosts = this.filteredBlogPosts;
    const uniquePosts = [];
    const map = new Map();
    
    for (const post of this.blogPosts) {
        if (!map.has(post.id)) {
            map.set(post.id, true);    // post.id (ili neko drugo polje koje garantuje jedinstvenost)
            uniquePosts.push(post);
        }
    }
    
    this.blogPosts = uniquePosts;
    console.log('blogovi',this.blogPosts)
      this.totalBlogPosts = result.totalCount;
    });
  }
}

