import hyRequest from '@/service'

export function getBanners() {
  return hyRequest.get({
    url: '/banner'
  })
}

export function getHotRecommend(limit = 30) {
  return hyRequest.get({
    url: '/personalized',
    params: {
      limit
    }
  })
}

export function getNewAlbum(limit = 10) {
  return hyRequest.get({
    url: '/album/newest',
    params: {
      limit
    }
  })
}
