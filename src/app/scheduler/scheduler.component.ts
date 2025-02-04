import { DatePipe, NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scheduler',
  imports: [ReactiveFormsModule, FormsModule, NgIf, NgFor, DatePipe],
  templateUrl: './scheduler.component.html',
  styleUrl: './scheduler.component.css'
})
export class SchedulerComponent {
  scheduleForm: FormGroup;
  isLinkPost = false;
  scheduledPosts: any[] = [];
  redditAccounts: string[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.scheduleForm = this.fb.group({
      title: ['', Validators.required],
      isLinkPost: [false],
      subreddit: ['', Validators.required],
      imageUrl: [''],
      nsfw: [false],
      spoiler: [false],
      oc: [false],
      postDate: ['', Validators.required],
      body: [''],
      redditAccount: ['', Validators.required]
    });

    this.scheduleForm.get('isLinkPost')?.valueChanges.subscribe(isLinkPost => {
      this.isLinkPost = isLinkPost;
      if (isLinkPost) {
        this.scheduleForm.get('imageUrl')?.setValidators([Validators.required]);
        this.scheduleForm.get('body')?.clearValidators();
      } else {
        this.scheduleForm.get('imageUrl')?.clearValidators();
        this.scheduleForm.get('body')?.setValidators([Validators.required]);
      }
      this.scheduleForm.get('imageUrl')?.updateValueAndValidity();
      this.scheduleForm.get('body')?.updateValueAndValidity();
    });
  }

  ngOnInit(): void {
    this.fetchRedditAccounts();
    this.fetchScheduledPosts();
  }

  fetchRedditAccounts(): void {
    const token = localStorage.getItem('Authorization');
    if (!token) {
      console.error('No authorization token found');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.get<string[]>('REPLACE_WITH_API_URL/getredditaccounts', { headers })
      .subscribe(
        (accounts) => {
          this.redditAccounts = accounts;
        },
        (error) => {
          console.error('Error fetching Reddit accounts', error);
        }
      );
  }

  onSubmit(): void {
    if (this.scheduleForm.invalid) {
      console.log('Form is invalid');
      return;
    }
  
    const postData = this.scheduleForm.value;
  
    const post = {
      title: postData.title,
      subreddit: postData.subreddit,
      postDate: postData.postDate,
      nsfw: postData.nsfw,
      spoiler: postData.spoiler,
      oc: postData.oc,
      redditAccount: postData.redditAccount,
      isLinkPost: postData.isLinkPost,
      imageUrl: postData.isLinkPost ? postData.imageUrl : null,
      body: postData.isLinkPost ? null : postData.body,
    };
  
    const token = localStorage.getItem('Authorization');
    if (!token) {
      console.error('No authorization token found');
      return;
    }
  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  
    this.http.post('REPLACE_WITH_API_URL/schedulepost', post, { 
      headers,
      responseType: 'text' as 'json'
    })
      .subscribe(
        (response) => {
          console.log(response);
          
          if (response === 'Post scheduled successfully!') {
            console.log('Post scheduled successfully!');
            this.scheduleForm.reset();
            this.fetchScheduledPosts();
          }
        },
        (error) => {
          console.error('Error scheduling post', error);
        }
      );
  }
  

  fetchScheduledPosts(): void {
    const token = localStorage.getItem('Authorization');
    if (!token) {
      console.error('No authorization token found');
      return;
    }
  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  
    this.http.get<string>('REPLACE_WITH_API_URL/getscheduledposts', { 
      headers, 
      responseType: 'text' as 'json'
    })
      .subscribe(
        (response) => {
          console.log('Fetched posts as raw string:', response);
    
          const wrappedResponse = `[${response}]`;
          console.log('Wrapped posts:', wrappedResponse);
    
          const rawPosts = JSON.parse(wrappedResponse);
          console.log('Raw posts:', rawPosts);
    
          console.log('Parsed posts:', rawPosts);
    
          this.scheduledPosts = rawPosts;
        },
        (error) => {
          console.error('Error fetching scheduled posts', error);
        }
      );
  }

  deleteScheduledPost(index: number): void {
    const postToDelete = this.scheduledPosts[index];
    
    const token = localStorage.getItem('Authorization');
    if (!token) {
      console.error('No authorization token found');
      return;
    }
  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  
    this.http.post('REPLACE_WITH_API_URL/deletescheduledpost', postToDelete, { 
      headers,
      responseType: 'text' as 'json'
    })
      .subscribe(
        (response) => {
          console.log(response);
          
          if (response === 'Post deleted successfully') {
            console.log('Post deleted successfully!');
            this.scheduledPosts.splice(index, 1);
          }
        },
        (error) => {
          console.error('Error deleting scheduled post', error);
        }
      );
  }
  
}