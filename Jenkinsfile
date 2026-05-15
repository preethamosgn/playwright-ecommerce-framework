pipeline {
    agent any

    parameters {
        choice(
            name: 'TEST_SUITE',
            choices: ['all', 'smoke', 'all'],
            description: 'Select which test suite to run'
        )
    }

    stages {

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                script {
                    echo "Selected Test Suite: ${params.TEST_SUITE}"
                    
                    if (params.TEST_SUITE == 'smoke') {
                        bat 'npx playwright test --grep "@smoke"'
                    } else if (params.TEST_SUITE == 'regression') {
                        bat 'npx playwright test --grep "@regression"'
                    } else {
                        bat 'npx playwright test'
                    }
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**, test-results/**', allowEmptyArchive: true

            publishHTML([
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])
        }
    }
}