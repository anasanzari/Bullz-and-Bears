@extends('common')

@section('meta')

@endsection

@section('content')

<div class="auth_page" style="overflow:auto">

  <div class="">
      <div class="container-fluid">
        <div class="row center-xs middle-xs" style="min-height:90vh">
          <div class="col-xs-12 col-md-12">
              <h1 style="margin-top:100px;">Bulls n Bears</h1>
              <div style="margin-top:25px">
                  <i style="font-size:6rem;" class="mdi mdi-heart-broken red-amber" ></i>
              </div>
              <h3 class="red" style="margin:30px 0px;">Game is over. Thanks for playing.</h3>
              <a href="./terms.pdf" class="btn btn--m btn--primary btn--raised" style="position: relative; overflow: hidden;">
                  <span class="ripple" style="height: 84px; width: 84px; top: -20px; left: -5px;"></span>
                  <span class="ng-scope">Terms and Conditions</span>
              </a>

              <h2 style="margin:25px 0px">Winners - Away</h2>
              <div class="row center-xs">
                  <div class="col-xs-10 col-md-6">
                      @foreach($away as $player)
                      <div class="card customcard">
                        <div class="p+">
                          <div class="row around-xs middle-xs">
                              <div class="col-xs center-xs">
                                  <img class="ava_pic" src="https://graph.facebook.com/{{$player->user['fbid']}}/picture?height=150&width=150" />
                              </div>
                              <div class="col-xs">
                                  <h2>{{$player->user['name']}}</h2>
                                  <p class="small">Rank</p>
                                  <p class="large blue"> {{$player['rank']}}</p>
                              </div>

                          </div>
                        </div>
                      </div>

                      @endforeach
                 </div>
             </div>

              <h2 style="margin:25px 0px">Winners - Home</h2>

              <div class="row center-xs">
                  <div class="col-xs-10 col-md-6">
                      @foreach($home as $player)
                      <div class="card customcard">
                        <div class="p+">
                          <div class="row around-xs middle-xs">
                              <div class="col-xs center-xs">
                                  <img class="ava_pic" src="https://graph.facebook.com/{{$player->user['fbid']}}/picture?height=150&width=150" />
                              </div>
                              <div class="col-xs">
                                  <h2>{{$player->user['name']}}</h2>
                                  <p class="small">Rank</p>
                                  <p class="large blue"> {{$player['rank']}}</p>
                              </div>

                          </div>
                        </div>
                      </div>

                      @endforeach
                 </div>
             </div>

            <a style="margin-top:15px" href="https://www.facebook.com/bullsnbearscommunity/" target="_blank" class="btn--fab btn btn--xl btn--primary" style="position: relative; overflow: hidden;">
             <span class="ripple" style="height: 36px; width: 36px; top: -1.60001px; left: -1.83331px;"></span>
             <i class="mdi mdi-facebook"></i>
            </a>
             <p style="margin:20px 0 10px 0">&copy;  Creative and Intellectual minds of NIT Calicut </p>



          </div>
         </div>
       </div>
  </div>
</div>


@endsection


@section('script')

@endsection
