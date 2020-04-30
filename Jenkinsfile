pipeline {
  agent any

  stages {
        stage('Build') {
            steps {
                sh 'yarn && yarn build'
            }
        }
        stage('Deploy') {
            steps {
                sh 'rm -rf /data/trailtour-frontend/*'
                sh 'cp -R $WORKSPACE/build/* /data/trailtour/'
            }
        }
    }
}
